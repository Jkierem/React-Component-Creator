#!/usr/bin/env node
const core = require('./core');
process.argv.push("-c")
core.runProgram(process.argv);
