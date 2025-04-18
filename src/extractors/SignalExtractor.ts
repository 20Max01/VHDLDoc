import Parser from 'web-tree-sitter';
import { Position } from '../elements/Common';
import { HDLSignal } from '../elements/HDLSignal';
import {
    GetLeadingComment,
    INodeExtractor,
    NodeHandler,
} from './interfaces/IHDLElementExtractor';
import { IHDLSignalInfo } from '../elements/interfaces/IHDLSignal';

/**
 * SignalExtractor extracts signal declarations from a VHDL AST.
 */
export class SignalExtractor implements INodeExtractor<HDLSignal> {
    /**
     * @inheritdoc
     */
    public get nodeType(): string {
        return 'signal_declaration';
    }

    /**
     * @inheritdoc
     */
    public readonly excludedParents = [
        'function_body',
        'procedure_body',
        'process_statement',
    ];

    /**
     * @inheritdoc
     */
    public readonly nodeHandler: NodeHandler<HDLSignal> = (
        node: Parser.SyntaxNode,
        getLeadingComment: GetLeadingComment,
    ): HDLSignal[] => {
        const result: HDLSignal[] = [];

        const nameNode = node.descendantsOfType('identifier_list')[0];
        const typeNode = node.descendantsOfType('subtype_indication')[0];
        const defaultNode = node.descendantsOfType('default_expression')[0];

        const names = nameNode.text.split(',').map((s) => s.trim());
        const type = typeNode?.text ?? '';
        const defaultValue = defaultNode?.text ?? undefined;
        const pos = Position.fromNode(nameNode);

        for (const name of names) {
            const comment = getLeadingComment(pos.startLine);

            const info: IHDLSignalInfo = {
                name,
                type,
                defaultValue,
                comment,
                description: undefined,
                position: pos,
            };

            result.push(new HDLSignal(info));
        }

        return result;
    };
}
