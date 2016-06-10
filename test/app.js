'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-rancher-catalog:app', function () {
  const clusterTypes = ['swarm', 'mesos', 'kubernetes', 'cattle'];
  const name = 'test';
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: name,
        clusterTypes: clusterTypes
      })
      .toPromise();
  });

  it('init git repository', function () {
    assert.file([
      '.git'
    ]);
  });

  it('init cluster template directory', function () {
    console.log(clusterTypes);
    clusterTypes.forEach(function (it) {
      const prefix = it === 'cattle' ? '' : `${it}-`;
      assert.file([
        `${prefix}templates/${name}/0/docker-compose.yml`,
        `${prefix}templates/${name}/0/rancher-compose.yml`,
        `${prefix}templates/${name}/config.yml`,
        `${prefix}templates/${name}/README.md`,
        `${prefix}templates/${name}/catalogIcon-${name}.svg`
      ]);
    });
  });
});
