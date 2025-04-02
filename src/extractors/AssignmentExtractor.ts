import Parser from 'web-tree-sitter';
import { Position } from '../elements/Common';
import { HDLAssignment } from '../elements/HDLAssignment';
import {
    GetLeadingComment,
    INodeExtractor,
    NodeHandler,
} from './interfaces/IHDLElementExtractor';
import { IHDLAssignmentInfo } from '../elements/interfaces/IHDLAssignment';

/**
 * AssignmentExtractor extracts concurrent signal assignments from a VHDL AST.
 */
export class AssignmentExtractor implements INodeExtractor<HDLAssignment> {
    public readonly nodeType = 'simple_concurrent_signal_assignment';

    /**
     * @inheritdoc
     */
    public readonly excludedParents = ['process_statement', 'declarative_part'];

    /**
     * @inheritdoc
     */
    public readonly nodeHandler: NodeHandler<HDLAssignment> = (
        node: Parser.SyntaxNode,
        getLeadingComment: GetLeadingComment,
    ): HDLAssignment[] => {
        const result: HDLAssignment[] = [];

        const targetNode = node.childForFieldName('target');

        const waveformsNode = node.namedChildren.find(
            (c) => c.type === 'waveforms',
        );

        const target = targetNode?.text.trim() ?? 'unknown';
        const expression = waveformsNode?.text.trim() ?? 'unknown';

        const pos = Position.fromNode(node);
        const comment = getLeadingComment(pos.startLine);

        const info: IHDLAssignmentInfo = {
            name: target,
            target,
            expression,
            comment,
            description: undefined,
            position: pos,
        };

        result.push(new HDLAssignment(info));

        return result;
    };
}
