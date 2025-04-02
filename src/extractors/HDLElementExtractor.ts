import Parser from 'web-tree-sitter';
import { ICommentOptions } from './interfaces/ICommentOptions';
import {
    GetLeadingComment,
    IHDLElementExtractor,
    INodeExtractor,
} from './interfaces/IHDLElementExtractor';
import {
    IHDLElement,
    IHDLElementInfo,
} from '../elements/interfaces/IHDLElement';
/**
 * Base class for all HDL element extractors.
 * Collects and provides access to leading comments and implements recursive AST traversal.
 */
export class HDLElementExtractor<T extends IHDLElement<IHDLElementInfo>>
    implements IHDLElementExtractor<T>
{
    protected readonly _comments: Map<number, string> = new Map();

    constructor(
        protected readonly root: Parser.SyntaxNode,
        protected readonly commentOptions: ICommentOptions = {
            markerPrefix: '@',
            stripPrefix: true,
        },

        protected readonly nodeExtractor: INodeExtractor<T>,
    ) {}

    /**
     * Collect all comments in the file and map them by line number.
     */
    protected extractComments(): void {
        const stack: Parser.SyntaxNode[] = [this.root];

        while (stack.length > 0) {
            const node = stack.pop();

            if (!node) continue;

            if (node.type === 'comment') {
                let comment = node.text.trim().replace(/^--\s*/, '');
                const prefix = this.commentOptions.markerPrefix;

                if (prefix && !comment.startsWith(prefix)) return;

                if (prefix && this.commentOptions.stripPrefix) {
                    comment = comment.substring(prefix.length);

                    if (comment.startsWith(' ')) comment = comment.substring(1);
                }

                this._comments.set(node.startPosition.row, comment);
            }

            for (const child of node.namedChildren) {
                stack.push(child);
            }
        }
    }

    /**
     * Try to find a contiguous block of comment lines directly above the given line.
     * Stops at the first non-comment or skipped line.
     * @param line The line number to check for comments.
     * @returns The comment block as a string, or undefined if no comments are found.
     */
    private readonly getLeadingComment: GetLeadingComment = (
        line: number,
    ): string | undefined => {
        const lines: string[] = [];
        let currentLine = line - 1;

        while (this._comments.has(currentLine)) {
            lines.unshift(this._comments.get(currentLine)!);
            currentLine--;
        }

        return lines.length > 0 ? lines.join('\n') : undefined;
    };

    /**
     * Recursively find all nodes of a given type in the syntax tree.
     * @param node The starting node.
     * @param type The node type to search for.
     * @returns A flat array of matching nodes.
     */
    protected findNodesByType(
        node: Parser.SyntaxNode,
        type: string,
    ): Parser.SyntaxNode[] {
        const result: Parser.SyntaxNode[] = [];

        if (this.nodeExtractor.excludedParents?.includes(node.type)) {
            return result;
        }

        if (node.type === type) {
            result.push(node);
        }

        for (const child of node.namedChildren) {
            result.push(...this.findNodesByType(child, type));
        }

        return result;
    }

    /**
     * Extract all elements of the specified type from the syntax tree.
     * Uses the provided handler function to process each node.
     * @returns An array of extracted elements.
     */
    public extract(): T[] {
        this.extractComments();
        const result: T[] = [];

        const nodes = this.findNodesByType(
            this.root,
            this.nodeExtractor.nodeType,
        );

        for (const node of nodes) {
            result.push(
                ...this.nodeExtractor.nodeHandler(node, this.getLeadingComment),
            );
        }

        return result;
    }
}
