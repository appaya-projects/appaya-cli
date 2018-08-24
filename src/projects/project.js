const lazyRequire = require('../../helpers/lazy-require');

const webpack = lazyRequire('webpack');
const serve = lazyRequire('webpack-serve');
const path = lazyRequire('path');


const WebpackConfig = require('../functions/webpack-config');
const styleGenerator = require('../functions/style-generator');
const behaviorGenerator = require('../functions/behavior-generator');
const filesInDir = require('../../helpers/files-in-dir');

class Project {

    constructor(settingsManager) {
        this.settingsManager = settingsManager;
    }

    async afterSetup() {

    }

    /*private*/ getConfig(env) {
        const config = {},
            projectConfig = this.settingsManager.settings.config;

        config.entry = projectConfig.entry;
        if (projectConfig.output) {
            config.output = {};
            config.output.path = path.resolve(projectConfig.output);
        }


        return config;
    }

    build() {
        const config = WebpackConfig('prod', this.getConfig('prod'));

        webpack(config, (err, stats) => {
            if (err || stats.hasErrors()) {
                for (let e of stats.compilation.errors) {
                    console.warn(e);
                }
            }
        });
    }

    serve() {
        const config = WebpackConfig('dev', this.getConfig('dev')),
            argv = {};

        // console.log(webpackConfig);

        serve(argv, { config }).then((result) => {  });
    }

    watch() {
        const webpackConfig = WebpackConfig('prod', this.getConfig('prod'));

        webpackConfig.watch = true;

        webpack(webpackConfig, (err, stats) => {
            if (err || stats.hasErrors()) {
                for (let e of stats.compilation.errors) {
                    console.warn(e);
                }
            }
        });
    }

    style(type, name) {
        styleGenerator(type, name);
    }

    behavior(name, extendsFrom = 'Behavior') {
        behaviorGenerator(name, extendsFrom);
    }

    page(name) {
        console.log(`Unsupported command for '${this.settingsManager.settings.type}' type. `);
        return;
    }

    styleBuilder() {
                
    }

}

module.exports = Project;