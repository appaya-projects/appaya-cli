const ProjectManager = require('./project-manager');

class AppManager {
    constructor(list, app) {
        this.list = list;
        this.app = app;
        this.projectManager = new ProjectManager();
    }

    init() {
        this.app
            .version('0.0.1')
            .description('Command Line Interface for appaya\'s projects.')
            
        for(let data of this.list) {
            this.addCommand(data);
        }

        this.app.parse(process.argv);
    }

    addCommand(data) {
        const command = this.app.command(data.name);
    
        if(data.alias) {
            command.alias(data.alias);
        }
    
        if(data.description) {
            command.description(data.description);
        }
    
        if(data.options) {
            for(let option of data.options) {
                command.option(option[0], option[1]);
            }
        }
        
        command.action((...args) => {
            if(data.init !== false) {
                this.projectManager.init();
            }

            if(typeof this.projectManager[data.action] == 'function') {
                this.projectManager[data.action](...args);
            } else {
                throw new Error('Undefined action name: ' + data.action);
            }

        });
    }
}

module.exports = AppManager;