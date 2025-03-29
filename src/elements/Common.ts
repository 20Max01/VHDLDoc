import Parser from 'web-tree-sitter';
import { IPosition } from './interfaces/Common';

/**
 * Position of a node in the source code.
 */
export class Position implements IPosition {
    /**
     * Convert a tree-sitter node to a position object.
     * @param node The tree-sitter node to convert.
     * @returns A position object representing the node.
     */
    static fromNode(node: Parser.SyntaxNode): Position {
        return new Position(
            node.startPosition.row,
            node.endPosition.row,
            node.startPosition.column,
            node.endPosition.column,
        );
    }

    /**
     * Position of a node in the source code.
     * @param startLine Start line number
     * @param endLine End line number
     * @param startColumn Start column number
     * @param endColumn End column number
     */
    constructor(
        public startLine: number,
        public endLine: number,
        public startColumn: number,
        public endColumn: number,
    ) {}

    /**
     * Convert the position to a string representation.
     * @returns String representation of the position
     */
    toString(): string {
        return `(${this.startLine}:${this.startColumn}-${this.endLine}:${this.endColumn})`;
    }
}
