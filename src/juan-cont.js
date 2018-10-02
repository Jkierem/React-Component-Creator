#!/usr/bin/env node
const core = require('./core');
process.argv.push("-r")
core.runProgram(process.argv);
