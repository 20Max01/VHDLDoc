import Parser from 'web-tree-sitter';
import { ICommentOptions } from './interfaces/ICommentOptions';
import {
    IHDLElement,
    IHDLElementInfo,
} from '../elements/interfaces/IHDLElement';

/**
 * Abstract base class for all HDL element extractors.
 * Collects and provides access to leading comments and implements recursive AST traversal.
 */
export abstract class HDLElementExtractor<
    T extends IHDLElement<IHDLElementInfo>,
> {
    protected readonly _comments: Map<number, string> = new Map();

    constructor(
        protected readonly root: Parser.SyntaxNode,
        protected readonly commentOptions: ICommentOptions = {
            markerPrefix: '@',
            stripPrefix: true,
        },
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
    protected getLeadingComment(line: number): string | undefined {
        const lines: string[] = [];
        let currentLine = line - 1;

        while (this._comments.has(currentLine)) {
            lines.unshift(this._comments.get(currentLine)!);
            currentLine--;
        }

        return lines.length > 0 ? lines.join('\n') : undefined;
    }

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

        if (node.type === type) {
            result.push(node);
        }

        for (const child of node.namedChildren) {
            result.push(...this.findNodesByType(child, type));
        }

        return result;
    }

    /**
     * The main extraction method to be implemented by subclasses.
     */
    abstract extract(): T[];
}
