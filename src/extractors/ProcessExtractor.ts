import Parser from 'web-tree-sitter';
import { Position } from '../elements/Common';
import { HDLProcess } from '../elements/HDLProcess';
import {
    GetLeadingComment,
    INodeExtractor,
    NodeHandler,
} from './interfaces/IHDLElementExtractor';
import { IHDLProcessInfo } from '../elements/interfaces/IHDLProcess';

/**
 * ProcessExtractor is a class that extracts process declarations from a VHDL AST.
 */
export class ProcessExtractor implements INodeExtractor<HDLProcess> {
    /**
     * @inheritdoc
     */
    public get nodeType(): string {
        return 'process_statement';
    }

    /**
     * @inheritdoc
     */
    public readonly nodeHandler: NodeHandler<HDLProcess> = (
        node: Parser.SyntaxNode,
        getLeadingComment: GetLeadingComment,
    ): HDLProcess[] => {
        const result: HDLProcess[] = [];

        const labelNode = node.namedChildren.find((c) => c.type === 'label');

        const identifier = labelNode?.namedChildren.find(
            (c) => c.type === 'identifier',
        );

        const sensitivityListNode = node.namedChildren.find(
            (c) => c.type === 'sensitivity_list',
        );

        const name = identifier?.text.trim() ?? 'unnamed';
        const pos = Position.fromNode(node);

        const sensitivityList = sensitivityListNode
            ? sensitivityListNode.namedChildren.map((n) => n.text.trim())
            : undefined;

        const comment = getLeadingComment(pos.startLine);

        const info: IHDLProcessInfo = {
            name,
            position: pos,
            comment,
            description: undefined,
            sensitivityList,
            processType: undefined,
        };

        result.push(new HDLProcess(info));

        return result;
    };
}
