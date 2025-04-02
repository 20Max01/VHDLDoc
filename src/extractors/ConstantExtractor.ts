/* eslint-disable max-len */
/* eslint-disable no-console */
import Parser from 'web-tree-sitter';
import { Position } from '../elements/Common';
import { HDLConstant } from '../elements/HDLConstant';
import {
    GetLeadingComment,
    INodeExtractor,
    NodeHandler,
} from './interfaces/IHDLElementExtractor';
import { IHDLConstantInfo } from '../elements/interfaces/IHDLConstant';

/**
 * ConstantExtractor extracts constant declarations from a VHDL AST.
 */
export class ConstantExtractor implements INodeExtractor<HDLConstant> {
    /**
     * @inheritdoc
     */
    public readonly nodeType = 'constant_declaration';

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
    public readonly nodeHandler: NodeHandler<HDLConstant> = (
        node: Parser.SyntaxNode,
        getLeadingComment: GetLeadingComment,
    ): HDLConstant[] => {
        const result: HDLConstant[] = [];

        const nameNode = node.descendantsOfType('identifier_list')[0];
        const typeNode = node.descendantsOfType('subtype_indication')[0];
        const defaultNode = node.descendantsOfType('default_expression')[0];

        const names = nameNode.text.split(',').map((s) => s.trim());
        const type = typeNode?.text ?? '';
        const defaultValue = defaultNode?.text ?? undefined;
        const pos = Position.fromNode(nameNode);

        for (const name of names) {
            const comment = getLeadingComment(pos.startLine);

            const info: IHDLConstantInfo = {
                name,
                type,
                defaultValue,
                comment,
                description: undefined,
                position: pos,
            };

            result.push(new HDLConstant(info));
        }

        return result;
    };
}
