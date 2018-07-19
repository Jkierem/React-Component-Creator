#!/usr/bin/env node
const core = require('./core');
process.argv.push("-f")
core.runProgram(process.argv);
