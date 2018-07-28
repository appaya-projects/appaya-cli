const fs = require('fs');
const path = require('path');

class Config {
    constructor(fileName = 'appaya-cli.json') {
        this.fileName = fileName;

        this.data = {};
    }



    get(id) {
        return this.data[id];
    }

    set(id, value) {
        this.data[id] = value;
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
            { type: 'input', name: 'name', message: 'Enter project name: ' },
            { type: 'list', name: 'type', message: 'Choose project type', choices: ['lp-boilerplate', 'timber-theme'] }
        ])

        answers.slug = answers.name
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes;

        for (let a in answers) {
            this.data[a] = answers[a];
        }
    }
}

module.exports = Config;