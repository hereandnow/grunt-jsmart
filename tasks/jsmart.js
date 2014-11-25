/*
 * grunt-jsmart
 * https://github.com/hereandnow/grunt-jsmart
 *
 * Copyright (c) 2014 Bastian "hereandnow" Behrens
 * Licensed under the MIT license.
 */

'use strict';

require('jsmart');
var path = require('path'),
    strcase = require('tower-strcase');

module.exports = function(grunt) {

  // get the Template-Data from Object, Directory or File
  function getTplData (data) {
    var obj = {};
    if (!data) { return obj; }
    if (typeof data === 'object') { return data; }
    if (typeof data === 'string') {
      if (grunt.file.isDir(data)) {
        grunt.file.recurse(data, function (abspath, rootdir, subdir, filename) {
          var subObj = obj;
          if(subdir) {
            subdir.split(path.separator).forEach(function (item) {
              item = strcase.camelCase(item);
              subObj[item] = subObj[item] || {};
              subObj = subObj[item];
            });  
          }          
          subObj[strcase.camelCase(path.basename(filename, '.json'))] = grunt.file.readJSON(abspath);          
        });        
      }
      if (grunt.file.isFile(data)) {
        obj[strcase.camelCase(path.basename(data, '.json'))] = grunt.file.readJSON(data);        
      }
    }

    if (Object.keys(obj).length === 0) {
      grunt.log.error('Could not extract any JSON-Data from ' + data);
    } 
    return obj;
  }


  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('jsmart', 'Compile Smarty Templates with jSmart', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    if (options.templatePath) {
      jSmart.prototype.getTemplate = function(name) {
        return grunt.file.read(path.join(options.templatePath, name));
      };
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        var tpl, compiledTpl;
        tpl = grunt.file.read(filepath);
        compiledTpl = new jSmart(tpl);
        return compiledTpl.fetch(getTplData(options.data));
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
