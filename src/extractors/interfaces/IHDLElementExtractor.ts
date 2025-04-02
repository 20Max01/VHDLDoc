import { IHDLElement, IHDLElementInfo } from 'elements/interfaces/IHDLElement';
import Parser from 'web-tree-sitter';
import { ICommentOptions } from './ICommentOptions';

/**
 * Try to find a contiguous block of comment lines directly above the given line.
 * Stops at the first non-comment or skipped line.
 * @param line The line number to check for comments.
 * @returns The comment block as a string, or undefined if no comments are found.
 */
export type GetLeadingComment = (line: number) => string | undefined;

/**
 * NodeHandler is a function type that takes a Parser.SyntaxNode and a GetLeadingComment function,
 * and returns an array of elements of type T.
 * @param node The syntax node to process.
 * @param getLeadingComment A function to retrieve leading comments for the node.
 * @returns An array of elements of type T.
 */
export type NodeHandler<T extends IHDLElement<IHDLElementInfo>> = (
    node: Parser.SyntaxNode,
    getLeadingComment: GetLeadingComment,
) => T[];

/**
 * INodeExtractor is an interface that defines a method to extract elements from a syntax tree.
 * It provides a node type and a handler function to process each node.
 */
export interface INodeExtractor<T extends IHDLElement<IHDLElementInfo>> {
    /**
     * The type of node to extract from the syntax tree.
     */
    readonly nodeType: string;

    /**
     * Optional list of parent node types under which this element should be ignored.
     */
    readonly excludedParents?: string[];

    /**
     * The handler function to process each node of the specified type.
     * It takes a node and a function to get leading comments.
     * @param node The syntax node to process.
     * @param getLeadingComment A function to retrieve leading comments for the node.
     * @returns An array of elements of type T.
     */
    readonly nodeHandler: NodeHandler<T>;
}

/**
 * IHDLElementExtractor_ is an interface that defines a constructor
 * for extracting elements from a syntax tree.
 * It takes a root node, optional comment options, a node type, and a handler function.
 */
export interface IHDLElementExtractor_<
    _T extends IHDLElement<IHDLElementInfo>,
> {
    new (
        root: Parser.SyntaxNode,
        commentOptions?: ICommentOptions,
        nodeType?: string,
        handler?: NodeHandler<_T>,
    ): IHDLElementExtractor<_T>;
}

export interface IHDLElementExtractor<T extends IHDLElement<IHDLElementInfo>> {
    /**
     * Extract all elements of the specified type from the syntax tree.
     * Uses the provided handler function to process each node.
     * @returns An array of extracted elements.
     */
    extract(): T[];
}
