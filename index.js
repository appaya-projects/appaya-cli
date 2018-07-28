#!/usr/bin/env node
const program = require('commander');
const AppayaCLI = require('./src/appaya');

const appayaCLI = new AppayaCLI();

program
    .version('0.0.1')
    .description('Command Line Interface for appaya\'s projects.')

program
    .command('new')
    .alias('n')
    .description('Create new project')
    .option('-s, --skip-install', 'Skip packages install.')
    .action(async (cmd) => {
        await appayaCLI.setup(cmd.skipInstall || false);
    });

program
    .command('serve')
    .alias('s')
    .description('run development server')
    .action(() => {
        appayaCLI.load();

        if (appayaCLI.config.get('type') == 'timber-theme') {
            console.log(`Unsupported command for 'timber-theme' type. Use 'appaya watch' instead.`);
            return;
        }

        appayaCLI.serve();

    });

program
    .command('watch')
    .alias('w')
    .description('run watch')
    .action(() => {
        appayaCLI.load();

        appayaCLI.build(true);
    });

program
    .command('build')
    .alias('b')
    .description('build package')
    .action(() => {
        appayaCLI.load();

        appayaCLI.build(false);
    });


program
    .command('style <type> <name>')
    .alias('gs')
    .description(`Add style file ('component|c', 'object|o', 'page|p', 'util|u')`)
    .action(async (type, name) => {
        appayaCLI.load();

        appayaCLI.addStyleFile(type, name);
    });

program
    .command('behavior <name> [extendsFrom]')
    .alias('gb')
    .description(`Add behavior file `)
    .action(async (name, extendsFrom) => {
        appayaCLI.load();

        appayaCLI.addBehaviorFile(name, extendsFrom);
    });

program
    .command('timber-page <name>')
    .alias('tp')
    .option('--no-wp-template', 'Don\'t create wordpress template file.')
    .description(`Add page files ('timber-theme' only)`)
    .action(async (name, cmd) => {
        appayaCLI.load();

        if (appayaCLI.config.get('type') != 'timber-theme') {
            console.log(`Unsupported type for this command. `);
            return;
        }

        appayaCLI.addTimberPageFile(name, cmd.wpTemplate);
    });


program
    .command('test')
    .alias('t')
    .description('run development server')
    .action(async () => {
        appayaCLI.init();

        console.log(appayaCLI.config.get('projectName'));
    });

program.parse(process.argv);


var NO_COMMAND_SPECIFIED = program.args.length === 0;

if (NO_COMMAND_SPECIFIED) {
    program.help();
}