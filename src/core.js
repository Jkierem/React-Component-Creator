'use-strict'
const path = require('path');
const program = require('commander');

const utils = require('./utils.js');
const codes = require('./codes.js');
const messages = require('./messages');

const validate = require('./validate')
const createHOC = require('./createHOC');
const createFuncComponent = require('./createFuncComponent');
const createClassComponent = require('./createClassComponent');
const createStyledComponent = require('./createStyledComponent');
const createContainerComponent = require('./createContainerComponent');

const pickType = (program) => {
  const flags = ['func', 'hoc', 'cont', 'styled', 'type'];
  const partial = utils.pick(flags, program);
  return Object.keys(partial).reduce((prev, next) => prev || partial[next] ? next : false, false) || 'class'
}

const pickProps = ({ props }) => props ? props.split(',') : []

const pickStyle = (program) => {
  const { styled, css, inline, info } = program;
  let style = {}

  if (inline) {
    if (inline === true) {
      style.js = `${info.name.toLowerCase()}Style`
    } else {
      style.js = inline
    }
  }

  if (css) {
    if (css === true) {
      style.css = info.name.toLowerCase()
    } else {
      style.css = css
    }
  }

  if (styled) {
    if (styled === true) {
      style.styled = 'div'
    } else {
      style.styled = `${styled}`
    }
  }

  return style;
}

const getInformation = (program) => {
  return {
    type: pickType(program),
    props: pickProps(program),
    style: pickStyle(program)
  }
}

const create = (info) => {
  const { type } = info;
  switch (type) {
    case 'styled':
      return createStyledComponent(info)
    case 'func':
      return createFuncComponent(info);
    case 'cont':
      return createContainerComponent(info);
    case 'hoc':
      return createHOC(info);
    default:
      return createClassComponent(info);
  }
}

const runProgram = async (argv) => {
  let info = {}
  program
    .version("2.0.0")
    .arguments('<name> [path]')
    .action((name, file) => {
      info = {
        name,
        path: file ? path.normalize(file) : './src/components'
      }
    })
    .option('--type <type>', 'choose component type, either func, hoc, cont, styled or class.', /^(func|hoc|class|cont|styled)$/i)
    .option('-f --func', 'create a functional component')
    .option('-i --hoc', 'create a higher order component')
    .option('-s --styled [tag]', 'create a styled component with the given tag. Default tag is div')
    .option('-r --cont', 'create a redux container component')
    .option('-l --inline [name]', 'add js inline style to component. Ignored in HOCs.')
    .option('-c --css [class]', 'add class and create a css file. Ignored in HOCs.')
    .option('--verbose', 'shows additional information')
    .option('--force-name', 'disables component name validation. NOT RECOMMENDED')
    .option('-p --props <props>', 'Specify the names of props to be passed on. If it is a functional component, destructuring of props will be used. If it is a HOC the props will be injected. The props must be separated by comma with no spaces.')
  program.parse(argv);
  try {
    program.info = info;
    await validate(program)
    const componentInfo = { ...info, ...getInformation(program) }
    await create(componentInfo)
    messages.showSuccessMessage({ ...componentInfo, verbose: program.verbose });
  } catch (e) {
    messages.showErrorMessage(e)
  }
}

module.exports = {
  runProgram
}
