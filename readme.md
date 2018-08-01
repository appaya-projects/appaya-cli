# Appaya CLI
Appaya CLI is a tool that connects all products of Appaya. Making work easier  by creating projects faster, starting developer server and building project.

## Instalation
```
npm install -g @appaya/cli@latest
```
### Updating Appaya CLI
```
npm uninstall -g @appaya/cli
npm cache verify
npm install -g @appaya/cli@latest
```

## Usage
```
appaya --help
```
  
### Creating new project
```
appaya new
```
This command will walk you throught installation process, asking for type of project, name etc.

More about project types. [Project Types](#project-types)

**Note:** Project will be created in current directory, it must be empty.

### Serving a project
```
appaya serve
```

### Build a project
```
appaya build
```

### Watching a project
```
appaya watch
```

## File generation
Appaya CLI has basic functions generating `.scss`, `.ts` etc.
```bash
# will create style files based on all *.html/*.twig files
appaya style-builder

# will create '_my-component.scss', in 'components' folder.
# also adding import in '__components.scss'
appaya style component "My Component"

# will create 'my-custom.behavior.ts' in `behaviors` folder,
# with class that extends 'AjaxFormBehavior'
# also adding class to 'Behaviors' list.
appaya behavior "My Custom" AjaxFormBehavior

# will create `page-custom.twig` with initial code.
# also `template-custom.php` responsible for creating wordpress `template` 
appaya page "Custom"

```

Appaya CLI will add reference for each file created




### Args for `appaya style`:
Command | File | Reference
--- | --- | ---
`appaya style component "My Component"` | `_my-component.scss` | `__components.scss`
`appaya style object "My Object"` | `_my-object.scss` | `__objects.scss`
`appaya style page "My Page"` | `_my-page.scss` | `__pages.scss`
`appaya style util "My Util"` | `_my-component.scss` | `__utils.scss`

**Note:** More about styles you can find here [todo]

### Args for `appaya behavior`:
Command | Description 
--- | --- 
`appaya behavior "My Custom"` | Create new class, which extends `Behavior`
`appaya behavior "My Custom" AjaxFormBehavior` | Create new class, which extends `AjaxFormBehavior`

**Note:** More about Appaya Behaviors you can find here: [todo]

### Args for `appaya page`:
Command | Page | Wordpress template
--- | --- | ---
`appaya page "My Custom"` | `page-my-custom.twig` | `template-my-custom.php`


**Note:** Only avalible for `timber-theme`project.

### Example `appaya style-builder` usage:
With `./src/index.html` file
```HTML
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <main class="p-index__main">
    <h1 class="o-heading">My heading</h1>
    <form action="#" class="c-form">
      <div class="c-form__group">
        // ...
      </div>
      <div class="c-form__group">
        // ...
      </div>
      <div class="c-form__group">
        // ...
      </div>

      <button class="o-btn">Send</button>
    </form>
  </main>
</body>

</html>
```
`appaya style-builder` will output:
```bash
'_form.scss' file created in './src/styles/components'
'.c-form' added in './src/styles/components/_form.scss'
'.c-form__group' added in './src/styles/components/_form.scss'
'_heading.scss' file created in './src/styles/objects'
'.o-heading' added in './src/styles/objects/_heading.scss'
'_btn.scss' file created in './src/styles/objects'
'.o-btn' added in './src/styles/objects/_btn.scss'
'_index.scss' file created in './src/styles/pages'
'.p-index__main' added in './src/styles/pages/_index.scss'
```

## Project types
There are two types are avalible for now.

Name | Description
--- | ---
[lp-boilerplate](https://github.com/appaya-projects/appaya-lp-boilerplate) | Used when creating LP.
[timber-theme](https://github.com/appaya-projects/appaya-timber-theme) | Starting template for wordpress. Based on [Timber](https://github.com/timber/timber), 



## Configuration
Everything is located in `appaya-cli.json` file.

Type | Description
--- | ---
`name` | Project name (*Generated when creating project*)
`type` | Project type (*Generated when creating project*)
`slug` | Slug (*Generated when creating project*)
`TBD` | lorem ipsum



## Dependencies
Appaya CLI uses a lot of dependencies, to make work efficiently. Below are most important ones.

1. [**Webpack(-serve, -command)**]()
2. [**Typescript**]()
3. [**Sass**]()
4. [**BrowserSync**]()
5. [**Appaya Behaviors**]()




 




