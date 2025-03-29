import { HDLElementExtractor } from './HDLElementExtractor';
import { Position } from '../elements/Common';
import { HDLSignal } from '../elements/HDLSignal';
import { IHDLSignalInfo } from '../elements/interfaces/IHDLSignal';

/**
 * Extractor for VHDL signal declarations.
 */
export class SignalExtractor extends HDLElementExtractor<HDLSignal> {
    /**
     * Extract all signal declarations from the syntax tree.
     * @returns An array of HDLSignal objects representing the extracted signals.
     */
    extract(): HDLSignal[] {
        this.extractComments();

        const result: HDLSignal[] = [];

        const signalNodes = this.findNodesByType(
            this.root,
            'signal_declaration',
        );

        for (const node of signalNodes) {
            const nameNode = node.descendantsOfType('identifier_list')[0];
            const typeNode = node.descendantsOfType('subtype_indication')[0];
            const defaultNode = node.descendantsOfType('default_expression')[0];

            const names = nameNode.text.split(',').map((s) => s.trim());
            const type = typeNode?.text ?? '';
            const defaultValue = defaultNode?.text ?? undefined;
            const pos = Position.fromNode(nameNode);

            for (const name of names) {
                const comment = this.getLeadingComment(pos.startLine);

                const info: IHDLSignalInfo = {
                    name,
                    type,
                    defaultValue,
                    comment,
                    description: undefined,
                    position: pos,
                };

                result.push(new HDLSignal(info));
            }
        }

        return result;
    }
}
