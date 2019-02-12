# grunt-jsmart

> Compile Smarty Templates with [jSmart](https://github.com/umakantp/jsmart)

Read the [jSmart Documentation here](https://github.com/umakantp/jsmart/wiki)


## THIS PACKAGE IS NOT MAINTAINED ANYMORE!

i would transfer, if there would be someone to maintain

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jsmart --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jsmart');
```

## The "jsmart" task

### Overview
In your project's Gruntfile, add a section named `jsmart` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jsmart: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.templatePath
Type: `String`
Default value: undefined

A string value where you can define a Path in your Project where jSmart should load Templates for Inheritance.

#### options.data
Type: `String`|`Object`
Default value: undefined

A value where you can pass your data as

1. Object
2. File
3. Directory


If you pass your data as JSON-File or Directory Containing JSON-Files, the `first Level` in Object-Hierarchy is the Name of the JSON-File (Underscores, Hyphens etc. are converted to camelCase!).

E.g. Your Filename is `book-store.json` with the content

    {
       "greeting": "Hi, there are some JScript books you may find interesting:"
    }

you must use it in your template like this:

    <h1>{$bookStore.greeting}</h1>


### Usage Examples

#### With Data as an Object

```js
grunt.initConfig({
  jsmart: {
    options: {
      templatePath: 'src/partials',
      data: {
        greeting: 'Hi, there are some JScript books you may find interesting:'
      }
    },
    your_target: {
      files: {
        'dest/books.html': ['src/templates/books.tpl'],
      }
    }
  },
});
```

#### With Data as a Filename

```js
grunt.initConfig({
  jsmart: {
    options: {
      templatePath: 'src/partials',
      data: 'src/data/books.json'
    },
    your_target: {
      files: {
        'dest/books.html': ['src/templates/books.tpl'],
      }
    }
  },
});
```

#### With Data as a Directory

```js
grunt.initConfig({
  jsmart: {
    options: {
      templatePath: 'src/partials',
      data: 'src/data/'
    },
    your_target: {
      files: {
        'dest/books.html': ['src/templates/books.tpl'],
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 0.2.1 Issue #6, use original jsmart again
* 0.2.0 Issue #5, use new jSmart Syntax
* 0.1.2 Issue #2, fix Punctuation
* 0.1.1 Issue #1, fix Examples in Readme
* 0.1.0 Initial Version
