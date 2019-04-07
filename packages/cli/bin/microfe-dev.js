#!/usr/bin/env node
const path = require ('path');
const program = require ('commander');
const dev = require ('../lib/dev');
const findConfig = require ('../lib/findConfig');
const normalize = require ('../lib/normalize');

program.usage ('[config-path]');
program.parse (process.argv);

const configPath = program.args[0] || 'microfe.js';
const conf = normalize (findConfig (configPath));
dev (Object.assign ({}, conf.dev, conf));
