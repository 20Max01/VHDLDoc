import Parser from 'web-tree-sitter';

/**
 * Static parser interface
 */
export interface IParser_ {
    new (): IParser;
}

/**
 * Parser interface
 */
export interface IParser {
    /**
     * Initialize the parser and load the language.
     * @returns A promise that resolves when the parser is initialized.
     */
    init(): Promise<void>;

    /**
     * Parse a string of code and return the parse tree.
     * @param code The code to parse
     * @returns The parsed tree.
     */
    parse(code: string): Parser.Tree;

    /**
     * Parse a file and return the parse tree.
     * @param path The path to the file to parse
     * @returns The parsed tree.
     */
    parseFile(path: string): Promise<Parser.Tree>;

    /**
     * Convert a tree-sitter node to a JSON object.
     * This is useful for debugging and visualization purposes.
     * @param node The tree-sitter node to convert.
     * @returns A JSON object representing the node.
     */
    toJson(node: Parser.SyntaxNode): Promise<unknown>;
}
