'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
 
var LegitGenerator = yeoman.generators.Base.extend({
  promptUser: function() {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    var prompts = [
      {
        name: 'appName',
        message: 'What is your module\'s name ?'
      },
      {
        name: 'appDescription',
        message: 'Describe your app briefly :'
      },
      {
        name: 'authorName',
        message: 'What is the author\'s name ?'
      },
      {
        type: 'confirm',
        name: 'addCSS',
        message: 'Does this module include default stylesheets ?',
        default: true
      },
      {
        type: 'confirm',
        name: 'addExampleApp',
        message: 'Would you like to generate an example app ?',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.authorName = props.authorName;
      this.addCSS = props.addCSS;
      this.addExampleApp = props.addExampleApp;

      done();
    }.bind(this));
  },
  scaffoldFolders: function() {
    this.mkdir("src");
    this.mkdir("lib");
    this.mkdir("tests");
  },
  copyMainFiles: function() {
    var context = { 
      module_name: this.appName,
      author_name: this.authorName,
      description: this.appDescription
    };
 
    this.template("_package.json", "package.json", context);
    this.template("_mocha.opts", "mocha.opts");
    this.template("_setup.js", "tests/setup.js");
    this.template("_test_helper.js", "tests/test_helper.js");
  },
  generateCSS: function() {
    if (this.addCSS) {
      this.mkdir("src/css");
      this.mkdir("lib/css");
      this.template("_default.css", "src/css/default.css");
    }
  },
  generateExampleApp: function() {
    if (this.addExampleApp) {
      this.mkdir("example");

      var context = {
        module_name: this.appName
      }

      this.template("_index.html", "example/index.html", context);
      this.template("_basic.jsx", "example/basic.jsx");
      this.template("_server.config.js", "example/server.config.js");
      this.template("_example.config.js", "example/example.config.js");
    }
  }
});
 
module.exports = LegitGenerator;
