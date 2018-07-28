module.exports = function (moduleName) {
    let module;
    return new Proxy(function () {
        if (!module) {
            module = require(moduleName)
        }
        return module.apply(this, arguments)
    }, {
        get: function (target, name) {
            if (!module) {
                module = require(moduleName)
            }
            return module[name];
        }
    })
};