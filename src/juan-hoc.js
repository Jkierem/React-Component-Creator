#!/usr/bin/env node
const core = require('./core');
process.argv.push("-i")
core.runProgram(process.argv);
