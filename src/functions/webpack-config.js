const webpackMerge = require('webpack-merge');
const staticData = require('../../static_data.json');
const PathResolver = require('../../helpers/path-resolver');


module.exports = function (env, customConfig) {
    const config = require(PathResolver.cli(staticData.configs[env]));

    if(!config) {
        throw new Error('Invalid config env');
    }
    const merged = webpackMerge(config, customConfig);

    return merged;
};