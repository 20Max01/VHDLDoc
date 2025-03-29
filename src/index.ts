/* eslint-disable no-console */
import { writeFileSync } from 'fs';
import { join } from 'path';
import { HDLSignal } from './elements/HDLSignal';
import { SignalExtractor } from './extractors/SignalExtractor';
import { VHDLParser } from './parser/VHDLParser';

/**
 * Main function to extract signals from a VHDL file and write them to a JSON file.
 */
async function main(): Promise<void> {
    const parser = new VHDLParser();
    await parser.init();

    const filePath = join(__dirname, '../test/AsyncFIFO.vhd');
    const tree = await parser.parseFile(filePath);

    const extractor = new SignalExtractor(tree.rootNode, {
        markerPrefix: '@',
        stripPrefix: true,
    });
    const signals: HDLSignal[] = extractor.extract();

    const output = join(__dirname, '../test/signals.json');

    writeFileSync(
        output,
        JSON.stringify(
            signals.map((s) => s.info),
            null,
            2,
        ),
    );

    console.log('✅ Signals written to:', output);
}

main().catch((e) => console.error('❌ Signal extraction failed:', e));
