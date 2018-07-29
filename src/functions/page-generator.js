const lazyRequire = require('../../helpers/lazy-require');

const fs = lazyRequire('fs');

const titleParse = require('../../helpers/title-parse');

function pageGenerator(name) {
    let wordpressTemplatesPath = './wordpress-templates/',
        filePath = './views/templates/',
        fileName = titleParse(name);


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

module.exports = pageGenerator;