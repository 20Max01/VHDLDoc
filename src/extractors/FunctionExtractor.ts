import { IHDLParameter } from 'elements/interfaces/Common';
import Parser from 'web-tree-sitter';
import { Position } from '../elements/Common';
import { HDLFunction } from '../elements/HDLFunction';
import {
    GetLeadingComment,
    INodeExtractor,
    NodeHandler,
} from './interfaces/IHDLElementExtractor';
import { IHDLFunctionInfo } from '../elements/interfaces/IHDLFunction';

/**
 * FunctionExtractor extracts function declarations from a VHDL AST.
 */
export class FunctionExtractor implements INodeExtractor<HDLFunction> {
    /**
     * @inheritdoc
     */
    public readonly nodeType = 'function_body';

    /**
     * @inheritdoc
     */
    public readonly nodeHandler: NodeHandler<HDLFunction> = (
        node: Parser.SyntaxNode,
        getLeadingComment: GetLeadingComment,
    ): HDLFunction[] => {
        const result: HDLFunction[] = [];

        const nameNode = node.namedChildren.find(
            (c) => c.type === 'identifier',
        );

        const parameterClause = node.namedChildren.find(
            (c) => c.type === 'function_parameter_clause',
        );

        const returnNode = node.namedChildren.find((c) => c.type === 'return');

        const returnTypeNode = returnNode?.namedChildren.find(
            (c) => c.type === 'type_mark',
        );

        const name = nameNode?.text.trim() ?? 'unnamed';
        const returnType = returnTypeNode?.text.trim() ?? 'void';

        const paramLines: string[] = [];
        const parameterList: IHDLParameter[] = [];

        if (parameterClause) {
            for (const decl of parameterClause.namedChildren) {
                const identifierList = decl.namedChildren
                    .find((c) => c.type === 'identifier_list')
                    ?.text.trim();

                const typeNode = decl.namedChildren.find(
                    (c) => c.type === 'subtype_indication',
                );

                const modeNode = decl.namedChildren.find(
                    (c) => c.type === 'mode',
                );

                const mode = modeNode?.text.trim(); // optional!
                const type = typeNode?.text.trim() ?? '';

                if (identifierList) {
                    const names = identifierList
                        .split(',')
                        .map((n) => n.trim());

                    for (const name of names) {
                        parameterList.push({ name, mode, type });

                        paramLines.push(
                            mode
                                ? `${name}: ${mode} ${type}`
                                : `${name}: ${type}`,
                        );
                    }
                }
            }
        }

        const parameters = paramLines.join('; ');
        const pos = Position.fromNode(node);
        const comment = getLeadingComment(pos.startLine);

        const info: IHDLFunctionInfo = {
            name,
            parameters,
            parameterList,
            returnType,
            position: pos,
            comment,
            description: undefined,
        };

        result.push(new HDLFunction(info));

        return result;
    };
}
