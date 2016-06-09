'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the good ' + chalk.red('generator-rancher-catalogue') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of the catalogue entry?',
      default: this.appname
    }, {
      type: 'checkbox',
      name: 'clusterTypes',
      choices: [
        {
          name: 'Cattle',
          value: 'cattle',
          checked: true
        },
        {
          name: 'Swarm',
          value: 'swarm'
        },
        {
          name: 'Kubernetes',
          value: 'kubernetes'
        },
        {
          name: 'Mesos',
          value: 'mesos'
        }
      ],
      message: 'What are the cluster management types?'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.spawnCommandSync('git', ['init']);
    this.props.clusterTypes.forEach(name => {
      const prefix = name === 'cattle' ? '' : `${name}-`;
      this.fs.copy(
        this.templatePath('templates'),
        this.destinationPath(`${prefix}templates/${this.props.name}`)
      );
    });
  }
});
