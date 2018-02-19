#!/usr/bin/env node

'use strict';

const pkg = require(`../package.json`);
var program = require(`commander`);
var semanticRelease = require(`./index.js`);

program
  .description(pkg.description)
  .version(pkg.version)
  .option('-p, --preset <convention>', 'Commit convention [angular, ...]. See \'conventional-recommended-bump\' for available options', /^(angular)$/)
  .parse(process.argv);
const packageOpts = {
  preset: program.preset,
};

semanticRelease(packageOpts)
  .then(function (releasedVersion) {
    const message = releasedVersion ?
      `Released version ${releasedVersion}` :
      `No changes are available to release.`;
    console.log(message);
  })
  .catch(error => {
    console.error(`semantic-release-gitlab failed for the following reason - ${error}`);
    process.exit(1);
  });

