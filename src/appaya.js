const lazyRequire = require('./helpers/lazy-require');

const fs = lazyRequire('fs');
const child_process = lazyRequire('child_process');
const webpack = lazyRequire('webpack');
const serve = lazyRequire('webpack-serve');

const Config = require('./config');
const types = require('./data/types');


class AppayaCLI {
    constructor() {
        this.config = new Config();
    }

    load() {
        this.config.load();
    }
    
    async setup(skipInstall) {
        await this.config.setup();

        const type = this.config.get('type'),
            typeData = types.get(type),
            cloneUrl = typeData.url;

        console.log(cloneUrl);
        await this.clone(cloneUrl);

        this.config.load();
        this.config.save();

        // change project name in package.json
        const _package = JSON.parse(fs.readFileSync('./package.json'));
        _package.name = this.config.get('slug');

        let data = JSON.stringify(_package, null, 2);
        fs.writeFileSync('./package.json', data);

        //if timber, change theme name
        if (type == 'timber-theme') {
            let _style = fs.readFileSync('./style.css', 'utf-8');
            _style = _style.replace('Theme Name: Appaya WP Theme', `Theme Name: ${this.config.get('name')}`);

            fs.writeFileSync('./style.css', _style);
        }

        // install packages
        if (!skipInstall) {
            child_process.execSync("npm install", { stdio: [0, 1, 2] });
        }

        console.log("Project created!\n");
    }

    clone(cloneUrl) {
        const Git = require("nodegit");

        const promise = new Promise((resolve) => {
            Git.Clone(cloneUrl, '.')
                .done(function (blob) {

                    resolve();
                });
        })

        return promise;
    }


    addStyleFile(type, name) {
        let filePath = './src/styles/',
            listFileName = '',
            prefix = '',
            fileName = name
                .toLowerCase()
                .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes;

        switch (type) {
            case 'c':
            case 'component':
                filePath += 'components/';
                listFileName = '__components.scss';
                prefix = 'c-';
                break;
            case 'o':
            case 'object':
                filePath += 'objects/';
                listFileName = '__objects.scss';
                prefix = 'o-';
                break;
            case 'p':
            case 'page':
                filePath += 'pages/';
                listFileName = '__pages.scss';
                prefix = 'p-';
                break;
            case 'u':
            case 'util':
                filePath += 'utils/';
                listFileName = '__utils.scss';
                prefix = 'u-';
                break;
            default:
                throw new Error(`Invalid style type. 'appaya add style --help' for more info`)
        }

        fs.appendFileSync(filePath + listFileName, `\n@import '${fileName}';`);

        fs.writeFileSync(`${filePath}_${fileName}.scss`, `.${prefix}${fileName} {\n    \n}`);

        console.log(`\n '_${fileName}.scss' created in  '${filePath}'\n`)

    }

    addTimberPageFile(name, wpTemplate) {
        let wordpressTemplatesPath = './wordpress-templates/',
            filePath = './views/templates/',
            fileName = name
                .toLowerCase()
                .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes;


        fs.writeFileSync(`${filePath}page-${fileName}.twig`, `
{% extends 'page.twig' %}

{% block content %}
    {{ parent() }}
    <section class="c-page__section c-page__custom">
        <div class="container">
            <p>I'm a custom content from custom page!</p>
        </div>
    </section>
{% endblock %}
        `);

        console.log(`\n'page-${fileName}.twig' created in  '${filePath}'\n`)
        
        if(wpTemplate) {
            fs.writeFileSync(`${wordpressTemplatesPath}template-${fileName}.php`, `
<?php 
/*	Template Name: ${name}	*/

$data = Timber::get_context();
$data['post'] = new TimberPost();

$data['page'] = 'page';	
$template = array( 'page-${fileName}.twig' );

Timber::render($template, $data );
        `);

        console.log(`'template-${fileName}.php' created in  '${wordpressTemplatesPath}'\n`)
        }
        

    }



    async addBehaviorFile(name, extendsFrom = 'Behavior') {
        let filePath = './src/scripts/',
            listFileName = 'main.ts',
            className = name
                .replace(/\s+/g, '')
                + 'Behavior',
            fileName = name
                .toLowerCase()
                .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-') // collapse dashes;
                + '.behavior';


        let listFile = fs.readFileSync(filePath + listFileName);

        let scriptsParser = require('./helpers/scripts-file-parser');
        const output = await scriptsParser.parse(filePath + listFileName, className, fileName);

        fs.writeFileSync(filePath + listFileName, output);


        const b = require('./helpers/behavior-files');

        if (extendsFrom == 'Behavior') {
            fs.writeFileSync(`${filePath}/behaviors/${fileName}.ts`, b.behaviorFile(className));
        } else {
            fs.writeFileSync(`${filePath}/behaviors/${fileName}.ts`, b.extendBehaviorFile(className, extendsFrom));
        }


        console.log(`\n '${fileName}.ts' created in  '${filePath}/behaviors'\n`)
    }

    build(watch) {
        let time1 = new Date().getTime();
        const type = this.config.get('type'),
            typeData = types.get(type),
            config = require(typeData.webpackConfig);

        
        let time2 = new Date().getTime();
        config.watch = watch;

        webpack(config, (err, stats) => {
            if (err || stats.hasErrors()) {
                for (let e of stats.compilation.errors) {
                    console.warn(e);
                }
            }
        });
    }

    serve() {
        const argv = {};
        const config = require('../config/webpack.dev.js');

        serve(argv, { config }).then((result) => { });
    }
}

module.exports = AppayaCLI;
