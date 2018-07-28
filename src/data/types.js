const absPath = require('../helpers/abs-path');

const data = {
    "lp-boilerplate": {
        url: 'https://github.com/appaya-projects/appaya-lp-boilerplate.git',
        webpackConfig: absPath.cli('config/webpack.prod.js')
    },
    "timber-theme": {
        url: 'https://github.com/appaya-projects/appaya-timber-theme.git',
        webpackConfig: absPath.cli('config/webpack.timber.js')
    }
};

module.exports = {
    data: data,
    get: function(name) {
        const type = data[name];

        if(!type) {
            throw new Error(`invalid type value - ${type}` );
        }

        return type;
    }

}