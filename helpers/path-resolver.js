const path = require('path');

class PathResolver {
    static cli(dir = './') {
        return path.resolve(__dirname, '../', dir);
    }

    static project(dir = './') {
        return path.resolve('./', dir)
    }
}

module.exports = PathResolver;