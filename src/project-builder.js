const lazyRequire = require('../helpers/lazy-require');
const staticData = require('../static_data.json');
const PathResolver = require('../helpers/path-resolver');

const fs = lazyRequire('fs');
const child_process = lazyRequire('child_process');


class ProjectBuilder {
    constructor(data) {
        this.settingsManager = data.settingsManager;
        this.skipInstall = data.skipInstall;
    }


    async setup() {
        await this.settingsManager.setup();

        const settings = this.settingsManager.settings,
            type = settings.type,
            typeData = staticData.projects[type],
            cloneUrl = typeData.url;

        await this.clone(cloneUrl);        
        await this.afterSetup();

        console.log("Project created!\n");
    }
    

    clone(cloneUrl) {
        const Git = require("nodegit");

        const promise = new Promise((resolve) => {
            Git.Clone(cloneUrl, '.')
                .done(function (blob) {

                    resolve();
                });
        })

        return promise;
    }

    async afterSetup() {
        const settings = this.settingsManager.settings;

        this.settingsManager.load();
        this.settingsManager.save();

        // change project name in package.json
        const _package = JSON.parse(fs.readFileSync(PathResolver.project('./package.json')));
        _package.name = settings.slug;

        let data = JSON.stringify(_package, null, 2);
        fs.writeFileSync('./package.json', data);

        if (!this.skipInstall) {
            child_process.execSync("npm install", { stdio: [0, 1, 2] });
        }

    }

}

module.exports = ProjectBuilder;