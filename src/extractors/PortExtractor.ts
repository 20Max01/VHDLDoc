import Parser from 'web-tree-sitter';
import { Position } from '../elements/Common';
import { HDLPort } from '../elements/HDLPort';
import {
    INodeExtractor,
    NodeHandler,
    GetLeadingComment,
} from './interfaces/IHDLElementExtractor';
import { IHDLParameter, IVirtualBus } from '../elements/interfaces/Common';
import { IHDLPortInfo } from '../elements/interfaces/IHDLPort';

/**
 * PortExtractor extracts port declarations and virtual buses from a VHDL AST.
 */
export class PortExtractor implements INodeExtractor<HDLPort> {
    public readonly nodeType = 'port_clause';
    public readonly excludedParents = [];

    private extractText(node: Parser.SyntaxNode | null | undefined): string {
        return node?.text?.trim() ?? '';
    }

    public readonly nodeHandler: NodeHandler<HDLPort> = (
        node: Parser.SyntaxNode,
        getLeadingComment: GetLeadingComment,
    ): HDLPort[] => {
        const ports: IHDLParameter[] = [];
        const virtualBuses: IVirtualBus[] = [];

        let currentVB: IVirtualBus | null = null;
        let commentBuffer: string[] = [];

        for (const child of node.children) {
            if (child.type === 'comment') {
                const text = child.text.replace(/^--@\s*/, '').trim();

                if (text.startsWith('@virtualbus')) {
                    const parts = text.split(/\s+/);
                    const name = parts[1];
                    const dirIndex = parts.indexOf('@dir');

                    const dir =
                        dirIndex !== -1 ? parts[dirIndex + 1] : undefined;
                    const comment = parts.slice(dirIndex + 2).join(' ');

                    currentVB = {
                        name,
                        mode: dir,
                        comment,
                        signals: [],
                    };

                    virtualBuses.push(currentVB);
                    commentBuffer = [];
                    continue;
                }

                if (text.startsWith('@end')) {
                    currentVB = null;
                    commentBuffer = [];
                    continue;
                }

                commentBuffer.push(text);
                continue;
            }

            if (child.type === 'signal_interface_declaration') {
                const idNode = child.children.find(
                    (c) => c.type === 'identifier_list',
                );
                const modeNode = child.children.find((c) => c.type === 'mode');

                const typeNode = child.children.find(
                    (c) => c.type === 'subtype_indication',
                );

                const defaultNode = child.children.find(
                    (c) => c.type === 'default_expression',
                );

                const name = this.extractText(
                    idNode?.namedChildCount === 1
                        ? idNode.namedChild(0)
                        : idNode,
                );
                const mode = this.extractText(modeNode);
                const type = this.extractText(typeNode);
                const defaultValue = this.extractText(defaultNode);

                const paramComment =
                    commentBuffer.length > 0
                        ? commentBuffer.join('\n')
                        : getLeadingComment(Position.fromNode(child).startLine);

                const param: IHDLParameter = {
                    name,
                    mode,
                    type,
                    defaultValue,
                    comment: paramComment,
                };

                if (currentVB) {
                    currentVB.signals.push(param);
                    commentBuffer = [];
                } else {
                    ports.push(param);
                }
            }
        }

        const info: IHDLPortInfo = {
            name: '',
            portList: ports,
            virtualBusList: virtualBuses,
            position: Position.fromNode(node),
        };

        return [new HDLPort(info)];
    };
}
