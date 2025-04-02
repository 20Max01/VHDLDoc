import { IHDLParameter } from 'elements/interfaces/Common';
import Parser from 'web-tree-sitter';
import { Position } from '../elements/Common';
import { HDLProcedure } from '../elements/HDLProcedure';
import {
    GetLeadingComment,
    INodeExtractor,
    NodeHandler,
} from './interfaces/IHDLElementExtractor';
import { IHDLProcedureInfo } from '../elements/interfaces/IHDLProcedure';

/**
 * ProcedureExtractor extracts procedure declarations from a VHDL AST.
 */
export class ProcedureExtractor implements INodeExtractor<HDLProcedure> {
    /**
     * @inheritdoc
     */
    public readonly nodeType = 'procedure_body';

    /**
     * @inheritdoc
     */
    public readonly nodeHandler: NodeHandler<HDLProcedure> = (
        node: Parser.SyntaxNode,
        getLeadingComment: GetLeadingComment,
    ): HDLProcedure[] => {
        const result: HDLProcedure[] = [];

        const nameNode = node.namedChildren.find(
            (c) => c.type === 'identifier',
        );

        const parameterClause = node.namedChildren.find(
            (c) => c.type === 'procedure_parameter_clause',
        );

        const parameters: string[] = [];
        const parameterList: IHDLParameter[] = [];

        if (parameterClause) {
            for (const decl of parameterClause.namedChildren) {
                const nameList = decl.namedChildren.find(
                    (c) => c.type === 'identifier_list',
                );

                const modeNode = decl.namedChildren.find(
                    (c) => c.type === 'mode',
                );

                const typeNode = decl.namedChildren.find(
                    (c) => c.type === 'subtype_indication',
                );

                const mode = modeNode?.text.trim() ?? '';
                const type = typeNode?.text.trim() ?? '';

                if (nameList) {
                    const names = nameList.text.split(',').map((n) => n.trim());

                    for (const name of names) {
                        parameterList.push({ name, mode, type });
                        parameters.push(`${name}: ${mode} ${type}`);
                    }
                }
            }
        }

        const name = nameNode?.text.trim() ?? 'unnamed';
        const pos = Position.fromNode(node);
        const comment = getLeadingComment(pos.startLine);

        const info: IHDLProcedureInfo = {
            name,
            parameters: parameters.join('; '),
            parameterList,
            position: pos,
            comment,
            description: undefined,
        };

        result.push(new HDLProcedure(info));

        return result;
    };
}
