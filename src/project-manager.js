const SettingsManager = require('./settings-manager');

class ProjectManager {

    constructor() {
        this.settingsManager = new SettingsManager();
        this.project = undefined;
    }

    init() {
        this.settingsManager.load();

        const settings = this.settingsManager.settings;

        let Project;
        switch (settings.type) {
            case 'lp-boilerplate':
                Project = require('./projects/project-lb');
                break;
            case 'timber-theme':
                Project = require('./projects/project-tt');
                break;
            default:
                throw new Error(`invalid type value - ${settings.type}`)
        }

        this.project = new Project(this.settingsManager);
    }


    /*private*/ async setup(data) {
        const ProjectBuilder = require('./project-builder');

        const projectBuilder = new ProjectBuilder(data);

        await projectBuilder.setup();

        this.init();
        await this.project.afterSetup();
    }

    // commands functions
    async create(cmd) {
        await this.setup({ skipInstall: cmd.skipInstall || false, settingsManager: this.settingsManager });
    }

    build() {
        this.project.build();
    }

    serve() {
        this.project.serve();
    }

    watch() {
        this.project.watch();
    }

    style(type, name) {
        this.project.style(type, name);
    }

    behavior(name, extendsFrom) {
        this.project.behavior(name, extendsFrom);
    }

    page(name) {
        this.project.page(name);
    }



}

module.exports = ProjectManager;