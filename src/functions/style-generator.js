const lazyRequire = require('../../helpers/lazy-require');

const fs = lazyRequire('fs');

const titleParse = require('../../helpers/title-parse');

function styleGenerator(type, name) {
    let filePath = './src/styles/',
        listFileName = '',
        prefix = '',
        fileName = titleParse(name);

    switch (type) {
        case 'c':
        case 'component':
            filePath += 'components/';
            listFileName = '__components.scss';
            prefix = 'c-';
            break;
        case 'o':
        case 'object':
            filePath += 'objects/';
            listFileName = '__objects.scss';
            prefix = 'o-';
            break;
        case 'p':
        case 'page':
            filePath += 'pages/';
            listFileName = '__pages.scss';
            prefix = 'p-';
            break;
        case 'u':
        case 'util':
            filePath += 'utils/';
            listFileName = '__utils.scss';
            prefix = 'u-';
            break;
        default:
            throw new Error(`Invalid style type. 'appaya add style --help' for more info`)
    }

    fs.appendFileSync(filePath + listFileName, `\n@import '${fileName}';`);

    fs.writeFileSync(`${filePath}_${fileName}.scss`, `.${prefix}${fileName} {\n    \n}`);

    console.log(`\n '_${fileName}.scss' created in  '${filePath}'\n`)
}

module.exports = styleGenerator;