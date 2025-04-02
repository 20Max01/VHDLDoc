import { Position } from 'elements/Common';
import { HDLGeneric } from 'elements/HDLGeneric';
import { IHDLParameter } from 'elements/interfaces/Common';
import { IHDLGenericInfo } from 'elements/interfaces/IHDLGeneric';
import Parser from 'web-tree-sitter';
import {
    INodeExtractor,
    NodeHandler,
    GetLeadingComment,
} from './interfaces/IHDLElementExtractor';

/**
 * GenericExtractor extracts generic declarations from a VHDL AST.
 */
export class GenericExtractor implements INodeExtractor<HDLGeneric> {
    /**
     * @inheritdoc
     */
    public get nodeType(): string {
        return 'generic_clause';
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
    public readonly nodeHandler: NodeHandler<HDLGeneric> = (
        node: Parser.SyntaxNode,
        getLeadingComment: GetLeadingComment,
    ): HDLGeneric[] => {
        const result: HDLGeneric[] = [];

        const genericNodes = node.descendantsOfType(
            'constant_interface_declaration',
        );

        const generics: IHDLParameter[] = [];

        for (const genericNode of genericNodes) {
            const nameNode =
                genericNode.childForFieldName('identifier') ??
                genericNode.descendantsOfType('identifier')[0];

            const typeNode =
                genericNode.childForFieldName('subtype_indication') ??
                genericNode.descendantsOfType('subtype_indication')[0];

            const defaultNode =
                genericNode.childForFieldName('default_expression') ??
                genericNode.descendantsOfType('default_expression')[0];

            const name = nameNode?.text ?? '';
            const type = typeNode?.text ?? '';
            const defaultValue = defaultNode?.text ?? undefined;

            const comment = getLeadingComment(
                nameNode?.startPosition.row ?? genericNode.startPosition.row,
            );

            generics.push({
                name,
                type,
                defaultValue,
                comment,
            });
        }

        const pos = Position.fromNode(node);

        const info: IHDLGenericInfo = {
            name: 'GenericClause',
            genericList: generics,
            position: pos,
            comment: getLeadingComment(pos.startLine),
            description: undefined,
        };

        result.push(new HDLGeneric(info));

        return result;
    };
}
