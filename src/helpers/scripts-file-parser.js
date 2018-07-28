const fs = require('fs');
const readline = require('readline');

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
module.exports = {
    parse: parse
}