import Parser from 'web-tree-sitter';

/**
 * Static interface for position objects.
 */
export interface IPosition_ {
    /**
     * Convert a tree-sitter node to a position object.
     * @param node The tree-sitter node to convert.
     * @returns A position object representing the node.
     */
    fromNode(node: Parser.SyntaxNode): IPosition;

    /**
     * Create a new position object.
     * @param startLine Start line number
     * @param endLine End line number
     * @param startColumn Start column number
     * @param endColumn End column number
     */
    new (
        startLine: number,
        endLine: number,
        startColumn: number,
        endColumn: number,
    ): IPosition;
}

/**
 * Position of a node in the source code.
 */
export interface IPosition {
    /**
     * The line number of the start of the node.
     */
    startLine: number;

    /**
     * The line number of the end of the node.
     */
    endLine: number;

    /**
     * The column number of the start of the node.
     */
    startColumn: number;

    /**
     * The column number of the end of the node.
     */
    endColumn: number;
}
