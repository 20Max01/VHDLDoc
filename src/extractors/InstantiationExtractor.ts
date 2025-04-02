import Parser from 'web-tree-sitter';
import { Position } from '../elements/Common';
import { Instantiation } from '../elements/HDLInstantiation';
import {
    GetLeadingComment,
    INodeExtractor,
    NodeHandler,
} from './interfaces/IHDLElementExtractor';
import { IHDLInstantiationInfo } from '../elements/interfaces/IHDLInstantiation';

/**
 * InstantiationExtractor extracts component instantiations from a VHDL AST.
 */
export class InstantiationExtractor implements INodeExtractor<Instantiation> {
    /**
     * @inheritdoc
     */
    public get nodeType(): string {
        return 'component_instantiation_statement';
    }

    /**
     * @inheritdoc
     */
    public readonly nodeHandler: NodeHandler<Instantiation> = (
        node: Parser.SyntaxNode,
        getLeadingComment: GetLeadingComment,
    ): Instantiation[] => {
        const result: Instantiation[] = [];

        // Name of the instance (label)
        const labelNode = node.namedChildren.find((c) => c.type === 'label');

        const identifier = labelNode?.namedChildren.find(
            (c) => c.type === 'identifier',
        );
        const name = identifier?.text.trim() ?? 'unnamed';

        // Try to extract instantiated entity name
        const entityInstantiation = node.namedChildren.find(
            (c) => c.type === 'entity_instantiation',
        );

        const selectedName = entityInstantiation?.namedChildren.find(
            (c) => c.type === 'selected_name',
        );

        const instanceType = selectedName?.text.trim() ?? 'unknown';

        const pos = Position.fromNode(node);
        const comment = getLeadingComment(pos.startLine);

        const info: IHDLInstantiationInfo = {
            name,
            instanceType,
            position: pos,
            comment,
            description: undefined,
        };

        result.push(new Instantiation(info));

        return result;
    };
}
