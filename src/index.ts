/* eslint-disable no-console */

import { HDLGeneric } from 'elements/HDLGeneric';
import { HDLPort } from 'elements/HDLPort';
import { HDLType } from 'elements/HDLType';
import { AssignmentExtractor } from 'extractors/AssignmentExtractor';
import { FunctionExtractor } from 'extractors/FunctionExtractor';
import { GenericExtractor } from 'extractors/GenericExtractor';
import { HDLElementExtractor } from 'extractors/HDLElementExtractor';
import { InstantiationExtractor } from 'extractors/InstantiationExtractor';
import { PortExtractor } from 'extractors/PortExtractor';
import { ProcedureExtractor } from 'extractors/ProcedureExtractor';
import { TypeExtractor } from 'extractors/TypeExtractor';
import { VariableExtractor } from 'extractors/VariableExtractor';
import { writeFileSync } from 'fs';
import { join } from 'path';
import Parser from 'web-tree-sitter';
import { HDLSignal } from './elements/HDLSignal';
import { ConstantExtractor } from './extractors/ConstantExtractor';
import { ProcessExtractor } from './extractors/ProcessExtractor';
import { SignalExtractor } from './extractors/SignalExtractor';
import { VHDLParser } from './parser/VHDLParser';

/**
 * Recursively converts a Tree-sitter SyntaxNode into a plain JSON object.
 * @param node The Tree-sitter SyntaxNode.
 * @returns A plain JSON object representing the node.
 */
function syntaxNodeToJson(node: Parser.SyntaxNode): unknown {
    return {
        type: node.type,
        text: node.text,
        startPosition: node.startPosition,
        endPosition: node.endPosition,
        children: node.namedChildren.map(syntaxNodeToJson),
    };
}

/**
 * Dumps the full AST of a Tree-sitter parsed file to a JSON file.
 * @param rootNode The root node of the syntax tree.
 * @param outputPath The path to the output JSON file.
 */
export function dumpAST(rootNode: Parser.SyntaxNode, outputPath: string): void {
    const ast = syntaxNodeToJson(rootNode);
    writeFileSync(outputPath, JSON.stringify(ast, null, 2));
    console.log(`🧠 AST written to ${outputPath}`);
}

/**
 * Main function to extract signals from a VHDL file and write them to a JSON file.
 */
async function main(): Promise<void> {
    const parser = new VHDLParser();
    await parser.init();

    const filePath = join(__dirname, '../test/AsyncFIFO.vhd');
    const tree = await parser.parseFile(filePath);

    dumpAST(tree.rootNode, join(__dirname, '../test/ast.json'));

    const commentOptions = {
        markerPrefix: '@',
        stripPrefix: true,
    };

    const processExtractor = new HDLElementExtractor(
        tree.rootNode,
        commentOptions,
        new ProcessExtractor(),
    );

    const processes = processExtractor.extract();

    writeFileSync(
        join(__dirname, '../test/processes.json'),
        JSON.stringify(processes, null, 2),
    );
    console.log('✅ Processes written to test/processes.json');

    const extractor = new HDLElementExtractor(
        tree.rootNode,
        commentOptions,
        new SignalExtractor(),
    );

    const signals: HDLSignal[] = extractor.extract();

    writeFileSync(
        join(__dirname, '../test/signals.json'),
        JSON.stringify(
            signals.map((s) => s.info),
            null,
            2,
        ),
    );

    console.log('✅ Signals written to test/signals.json');

    const constantExtractor = new HDLElementExtractor(
        tree.rootNode,
        commentOptions,
        new ConstantExtractor(),
    );

    const constants = constantExtractor.extract();

    writeFileSync(
        join(__dirname, '../test/constants.json'),
        JSON.stringify(constants, null, 2),
    );
    console.log('✅ Constants written to test/constants.json');

    const instantiationExtractor = new HDLElementExtractor(
        tree.rootNode,
        commentOptions,
        new InstantiationExtractor(),
    );

    const instantiations = instantiationExtractor.extract();

    writeFileSync(
        join(__dirname, '../test/instantiations.json'),
        JSON.stringify(instantiations, null, 2),
    );
    console.log('✅ Instantiations written to test/instantiations.json');

    const functionExtractor = new HDLElementExtractor(
        tree.rootNode,
        commentOptions,
        new FunctionExtractor(),
    );

    const functions = functionExtractor.extract();

    writeFileSync(
        join(__dirname, '../test/functions.json'),
        JSON.stringify(
            functions.map((f) => f.info),
            null,
            2,
        ),
    );
    console.log('✅ Functions written to test/functions.json');

    const assignmentExtractor = new HDLElementExtractor(
        tree.rootNode,
        commentOptions,
        new AssignmentExtractor(),
    );

    const assignments = assignmentExtractor.extract();

    writeFileSync(
        join(__dirname, '../test/assignments.json'),
        JSON.stringify(assignments, null, 2),
    );
    console.log('✅ Assignments written to test/assignments.json');

    const variableExtractor = new HDLElementExtractor(
        tree.rootNode,
        commentOptions,
        new VariableExtractor(),
    );

    const variables = variableExtractor.extract();

    writeFileSync(
        join(__dirname, '../test/variables.json'),
        JSON.stringify(variables, null, 2),
    );
    console.log('✅ Variables written to test/variables.json');

    const procedureExtractor = new HDLElementExtractor(
        tree.rootNode,
        commentOptions,
        new ProcedureExtractor(),
    );

    const procedures = procedureExtractor.extract();

    writeFileSync(
        join(__dirname, '../test/procedures.json'),
        JSON.stringify(procedures, null, 2),
    );
    console.log('✅ Procedures written to test/procedures.json');

    const typeExtractor = new HDLElementExtractor<HDLType>(
        tree.rootNode,
        commentOptions,
        new TypeExtractor(),
    );

    const types = typeExtractor.extract();

    writeFileSync(
        join(__dirname, '../test/types.json'),
        JSON.stringify(
            types.map((t) => t.info),
            null,
            2,
        ),
    );
    console.log(`✅ Types written to test/types.json`);

    const genericExtractor = new HDLElementExtractor<HDLGeneric>(
        tree.rootNode,
        commentOptions,
        new GenericExtractor(),
    );

    const generics = genericExtractor.extract();

    writeFileSync(
        join(__dirname, '../test/generics.json'),
        JSON.stringify(
            generics.map((g) => g.info),
            null,
            2,
        ),
    );
    console.log(`✅ Generics written to test/generics.json`);

    const portExtractor = new HDLElementExtractor<HDLPort>(
        tree.rootNode,
        commentOptions,
        new PortExtractor(),
    );

    const port = portExtractor.extract();

    writeFileSync(
        join(__dirname, '../test/ports.json'),
        JSON.stringify(
            port.map((p) => p.info),
            null,
            2,
        ),
    );

    console.log(`✅ Ports written to test/ports.json`);
}

main().catch((e) => console.error('❌ Signal extraction failed:', e));
