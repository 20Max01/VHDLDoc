/* eslint-disable max-len */
/* eslint-disable no-console */
import Parser from 'web-tree-sitter';
import { Position } from '../elements/Common';
import { HDLVariable } from '../elements/HDLVariable';
import {
    GetLeadingComment,
    INodeExtractor,
    NodeHandler,
} from './interfaces/IHDLElementExtractor';
import { IHDLVariableInfo } from '../elements/interfaces/IHDLVariable';

/**
 * VariableExtractor extracts variable declarations from a VHDL AST.
 */
export class VariableExtractor implements INodeExtractor<HDLVariable> {
    /**
     * @inheritdoc
     */
    public readonly nodeType = 'variable_declaration';

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
    public readonly nodeHandler: NodeHandler<HDLVariable> = (
        node: Parser.SyntaxNode,
        getLeadingComment: GetLeadingComment,
    ): HDLVariable[] => {
        const result: HDLVariable[] = [];

        const nameNode = node.descendantsOfType('identifier_list')[0];
        const typeNode = node.descendantsOfType('subtype_indication')[0];
        const defaultNode = node.descendantsOfType('default_expression')[0];

        const names = nameNode.text.split(',').map((s) => s.trim());
        const type = typeNode?.text ?? '';
        const defaultValue = defaultNode?.text ?? undefined;
        const pos = Position.fromNode(nameNode);

        for (const name of names) {
            const comment = getLeadingComment(pos.startLine);

            const info: IHDLVariableInfo = {
                name,
                type,
                defaultValue,
                comment,
                description: undefined,
                position: pos,
            };

            result.push(new HDLVariable(info));
        }

        return result;
    };
}
