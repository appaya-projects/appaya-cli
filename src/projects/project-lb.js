const Project = require('./project');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class ProjectLB /*Project LP-Boilerplate*/ extends Project {

    getConfig(env) {
        const config = {},
            projectConfig = this.settingsManager.settings.config;

        if(!config.plugins) {
            config.plugins = [];
        }

        for(const html of projectConfig["html-files"]) {
            config.plugins.push(
                new HtmlWebpackPlugin({
                    template: 'src/' + html,
                    filename: html
                })
            );
        }

        return config;
    }

    styleBuilder() {
        const files = [],
            projectConfig = this.settingsManager.settings.config;

        for(const html of projectConfig["html-files"]) {
            files.push('./src/' + html);
        }

        if (!files) {
            return;
        }
        const StyleBuiler = require('../style-builder'),
            styleBuilerInst = new StyleBuiler(files);

        styleBuilerInst.load();
        styleBuilerInst.parse();
        styleBuilerInst.build();
        
    }
}

module.exports = ProjectLB;