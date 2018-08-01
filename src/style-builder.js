const lazyRequire = require('../helpers/lazy-require');

const fs = lazyRequire('fs');

const pathResolver = require('../helpers/path-resolver');
class StyleBuilder {
    constructor(fileUrls) {
        this.fileUrls = fileUrls;
        this.regex = /<[^\/]\s*[^>]*class="([^"]+)[^>]*>/mgi;

        this.file = '';

        this.styles = {
            "components": {},
            "objects": {},
            "utils": {},
            "pages": {},
        }

        this.ignore = ['size']
    }

    load() {
        for(const file of this.fileUrls) {
            try {
                const data = fs.readFileSync(file, 'UTF-8');
    
                this.file += data;
    
            } catch (error) {
                throw new Error(`'${this.fileUrl}' not found. Type 'appaya style-builder --help' for more info.`)
            }
        }
        

    }

    parse() {
        let match;
        while (match = this.regex.exec(this.file)) {
            const styles = match[1].split(' ');

            for (const _style of styles) {
                const styleObject = this.parseStyle(_style);

                if (!styleObject) {
                    continue;
                }

                this.addIfNotExists(styleObject);


            }
        }

    }


    parseStyle(styleName) {

        const styleType = this.getStyleType(styleName);

        if (!styleType) return;

        const styleObject = {};
        styleObject.styleName = styleName;
        styleObject.styleType = styleType;
        styleObject.styleFilename = this.parseStyleFilename(styleName);

        return styleObject;
    }

    parseStyleFilename(styleName) {

        let styleFilename = styleName.substr(2);
        if (styleFilename.indexOf('__') != -1) {
            styleFilename = styleFilename.substring(0, styleName.indexOf('__') - 2);
        }

        if (styleFilename.indexOf('--') != -1) {
            styleFilename = styleFilename.substring(0, styleName.indexOf('--') - 2);
        }

        const indexMatch = styleFilename.match(/-[0-9]+$/gm);
        if (indexMatch) {
            styleFilename = styleFilename.slice(0, indexMatch[0].length * -1)
        }

        return styleFilename;
    }

    addIfNotExists(styleObj) {
        if (!this.styles[styleObj.styleType]) {
            return;
        }

        const styleCategory = this.styles[styleObj.styleType];

        if (!styleCategory[styleObj.styleFilename]) {
            styleCategory[styleObj.styleFilename] = [styleObj.styleName];

            return;
        }
        if (styleCategory[styleObj.styleFilename].indexOf(styleObj.styleName) == -1) {
            styleCategory[styleObj.styleFilename].push(styleObj.styleName);
        }
    }

    getStyleType(styleName /*string*/) {
        const type = styleName.substr(0, 2);

        switch (type) {
            case 'c-':
                return 'components';
            case 'o-':
                return 'objects';
            case 'p-':
                return 'pages';
            /* TODO: decide what to do with utils
            case 'u-':
                 return 'utils';*/
            default:
                return null;
        }
    }


    build() {
        const stylesDir = './src/styles/';

        for (const styleType in this.styles) {
            const styleTypeDir = stylesDir + styleType,
                styleTypePath = `${styleTypeDir}/__${styleType}.scss`,
                styleTypeContent = fs.readFileSync(styleTypePath, 'UTF-8');

            for (let styleFileName in this.styles[styleType]) {
                this.addStyleImport(styleFileName, styleTypePath, styleTypeContent);
                this.fillStyleFile(`_${styleFileName}.scss`, styleTypeDir, this.styles[styleType][styleFileName])
            }
        }
    }

    addStyleImport(fileName, styleTypePath, styleTypeContent) {
        const importSentence = `@import '${fileName}';`;
        if(styleTypeContent.indexOf(importSentence) == -1) {
            fs.appendFileSync(styleTypePath, `\n${importSentence}`);

            return true;
        }

        return false;
    }

    fillStyleFile(fileName, styleTypeDir, styleClasses) {
        let filePath = `${styleTypeDir}/${fileName}`,
            fileContent = '';

        if (fs.existsSync(filePath)) {
            fileContent = fs.readFileSync(filePath, 'UTF-8');
        } else {
            console.log(`'${fileName}' file created in '${styleTypeDir}'`);
        }

        for (const styleClass of styleClasses) {
            const reg = new RegExp('\.(' + styleClass + ')\\s*{', 'gm'),
                match = reg.exec(fileContent);

            if (!match) {
                fs.appendFileSync(filePath, `\n.${styleClass} {\n  \n}\n`);

                console.log(`'.${styleClass}' added in '${filePath}'`);
            }

        }


    }
}

module.exports = StyleBuilder;

