import { IHDLTypeInfo } from 'elements/interfaces/IHDLTypeInfo';
import Parser from 'web-tree-sitter';
import { Position } from '../elements/Common';
import { HDLType } from '../elements/HDLType';
import {
    GetLeadingComment,
    INodeExtractor,
    NodeHandler,
} from './interfaces/IHDLElementExtractor';

/**
 * TypeExtractor extracts full type declarations from a VHDL AST.
 */
export class TypeExtractor implements INodeExtractor<HDLType> {
    /**
     * @inheritdoc
     */
    public readonly nodeType = 'full_type_declaration';

    /**
     * @inheritdoc
     */
    public readonly nodeHandler: NodeHandler<HDLType> = (
        node: Parser.SyntaxNode,
        getLeadingComment: GetLeadingComment,
    ): HDLType[] => {
        const result: HDLType[] = [];

        const nameNode = node.namedChildren.find(
            (c) => c.type === 'identifier',
        );

        const typeExprNode = node.namedChildren.find(
            (c) => c.type === 'constrained_array_definition',
        );

        const name = nameNode?.text.trim() ?? 'unnamed_type';
        const typeExpression = typeExprNode?.text.trim() ?? 'unknown';

        const pos = Position.fromNode(node);
        const comment = getLeadingComment(pos.startLine);

        const info: IHDLTypeInfo = {
            name,
            typeExpression,
            comment,
            description: undefined,
            position: pos,
        };

        result.push(new HDLType(info));

        return result;
    };
}
