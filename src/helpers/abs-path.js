const path = require('path');

function cli(dir) {
    return path.resolve(__dirname, '../../', dir);
}

function project(dir) {
    return path.resolve('./', dir)
}


module.exports = {
    cli: cli,
    project: project
}