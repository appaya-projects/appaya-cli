const lazyRequire = require('../../helpers/lazy-require');

const fs = lazyRequire('fs');
const readline = lazyRequire('readline');

const titleParse = require('../../helpers/title-parse');


function parse(path, name, fileName) {
    return new Promise((resolve) => {
        let output = '';

        const rl = readline.createInterface({
            input: fs.createReadStream(path),
            crlfDelay: Infinity
        });

        let lastLine = '';
        rl.on('line', (line) => {

            if (line.indexOf('import {') == -1 && lastLine.indexOf('import {') != -1) {
                output += `import { ${name} } from './behaviors/${fileName}';` + '\n';
            }

            if (line == 'BehaviorBootstrap([') {
                line += `\n\t${name},`;
            }


            output += line + '\n';
            lastLine = line;
        });

        rl.on('close', () => {
            resolve(output);
        })
    })
}

async function behaviorGenerator(name, extendsFrom) {
    let filePath = './src/scripts/',
        listFileName = 'main.ts',
        className = name
            .replace(/\s+/g, '')
            + 'Behavior',
        fileName = titleParse(name)
            + '.behavior';

    const output = await parse(filePath + listFileName, className, fileName);
    fs.writeFileSync(filePath + listFileName, output);

    if (extendsFrom == 'Behavior') {
        fs.writeFileSync(`${filePath}/behaviors/${fileName}.ts`,
            `import { Behavior } from "@appaya/behavior";

export class ${className} extends Behavior {
    protected defaultOptions: { [key: string]: any; };    
    public init(): void {
        throw new Error("Method not implemented.");
    }
}`
        );
    } else {
        fs.writeFileSync(`${filePath}/behaviors/${fileName}.ts`, 
`import { ${extendsFrom} } from "@appaya/behavior/list";

export class ${className} extends ${extendsFrom} {
    
}`
        );
    }


    console.log(`\n '${fileName}.ts' created in  '${filePath}/behaviors'\n`)
}

module.exports = behaviorGenerator;