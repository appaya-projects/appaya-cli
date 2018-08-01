#!/usr/bin/env node

const app = require('commander');
const AppManager = require('./src/app-manager');

const commands = [
    {
        name: 'new',
        alias: 'n', 
        description: 'Create new project', 
        options: [
            ['-s, --skip-install', 'Skip packages install.']
        ], 
        action: 'create',
        init: false
    },
    { name: 'serve', alias: 's', description: 'run development server', action: 'serve' },
    { name: 'watch', alias: 'w', description: 'run watch', action: 'watch' },
    { name: 'build', alias: 'b', description: 'run build', action: 'build' },

    { name: 'style <type> <name>', alias: 'gs', description: `Add style file ('component|c', 'object|o', 'page|p', 'util|u')`, action: 'style' },
    { name: 'behavior <name> [extendsFrom]', alias: 'gb', description: `Add behavior file`, action: 'behavior' },
    { name: 'page <name>', alias: 'gp', description: `Add page file ('timber-theme' only)`, action: 'page' },
    
    { name: 'style-builder [fileName]', alias: 'sb', description: `Create style files based on HTML file.`, action: 'styleBuilder' }
];

new AppManager(commands, app).init();
