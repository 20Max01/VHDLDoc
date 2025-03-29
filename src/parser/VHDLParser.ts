import { readFileSync } from 'fs';
import { join } from 'path';
import Parser from 'web-tree-sitter';
import { IParser } from './interfaces/IParser';

/**
 * VHDLParser is a class that provides methods to parse VHDL code
 * using the tree-sitter library.
 */
export class VHDLParser implements IParser {
    private _parser!: Parser;

    /**
     * @inheritdoc
     */
    async init(): Promise<void> {
        await Parser.init();
        this._parser = new Parser();

        const lang = await Parser.Language.load(
            join(__dirname, '../vendor/tree-sitter-vhdl.wasm'),
        );
        this._parser.setLanguage(lang);
    }

    /**
     * @inheritdoc
     */
    parse(code: string): Parser.Tree {
        return this._parser.parse(code);
    }

    /**
     * @inheritdoc
     */
    async parseFile(path: string): Promise<Parser.Tree> {
        const code = readFileSync(path, 'utf-8');

        return this.parse(code);
    }

    /**
     * @inheritdoc
     */
    async toJson(node: Parser.SyntaxNode): Promise<unknown> {
        return {
            type: node.type,
            text: node.text,
            startPosition: node.startPosition,
            endPosition: node.endPosition,
            children: await Promise.all(
                node.namedChildren.map((child) => this.toJson(child)),
            ),
        };
    }
}
