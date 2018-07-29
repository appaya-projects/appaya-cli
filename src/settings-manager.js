const PathResolver = require('../helpers/path-resolver');
const titleParse = require('../helpers/title-parse');
const path = require('path');
const fs = require('fs');

class SettingsManager {

    get settings() {
        return this.data;
    }

    constructor(fileName = 'appaya-cli.json') {
        this.fileName = fileName;

        this.data = {};
    }

    load() {
        try {
            const data = JSON.parse(fs.readFileSync(this.fileName));
            
            for (let a in data) {
                if (this.data[a] == undefined) {
                    this.data[a] = data[a];
                }
            }

        } catch (error) {
            throw new Error(`'appaya-cli.json' not found. Type 'appaya --help' for more info.`)
        }
    }

    save() {
        let data = JSON.stringify(this.data, null, 4);
        fs.writeFileSync(this.fileName, data);
    }

    async setup() {
        const Inquirer = require('inquirer');

        let answers = await Inquirer.prompt([
            { type: 'input', name: 'name', message: 'Enter project name: ', default: path.basename(PathResolver.project()) },
            { type: 'list', name: 'type', message: 'Choose project type', choices: ['lp-boilerplate', 'timber-theme'] }
        ])

        answers.slug = titleParse(answers.name);

        for (let a in answers) {
            this.data[a] = answers[a];
        }
    }
}

module.exports = SettingsManager;