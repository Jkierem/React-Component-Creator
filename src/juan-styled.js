#!/usr/bin/env node
const core = require('./core');
process.argv.push("-s")
core.runProgram(process.argv);