const lazyRequire = require('../../helpers/lazy-require');

const BrowserSyncPlugin = lazyRequire('browser-sync-webpack-plugin');
const fs = lazyRequire('fs');

const Project = require('./project');
const pageGenerator = require('../functions/page-generator');

class ProjectTT /*Project Timber-Theme*/ extends Project {

    async afterSetup() {
        await super.afterSetup();

        let _style = fs.readFileSync('./style.css', 'utf-8');
        _style = _style.replace('Theme Name: Appaya WP Theme', `Theme Name: ${this.settingsManager.settings.name}`);

        fs.writeFileSync('./style.css', _style);
    }

    getConfig(env) {
        const config = super.getConfig();

        switch (env) {
            case 'dev':
                config.plugins = [
                    new BrowserSyncPlugin({
                        proxy: this.settingsManager.settings.proxy,
                        files: ['./*.php', './views/**/*.twig', './assets/**/*.*'],
                    }),
                ]
                break;
        }

        return config;
    }

    // commands
    page(name) {
        pageGenerator(name);
    }
}

module.exports = ProjectTT;