'use-strict'
const path = require('path');
const program = require('commander');

const utils = require('./utils.js');
const codes = require('./codes.js');
const messages = require('./messages');

const createHOC = require('./createHOC');
const createFuncComponent = require('./createFuncComponent');
const createClassComponent = require('./createClassComponent');

const checkName = (name) => {
  if( name === undefined ){
    return { valid:false , err: codes.NO_NAME }
  }
  const c =  name.charAt(0);
  if( c !== c.toUpperCase() ){
    return { valid:false , err: codes.UPPERCASE }
  }else{
    return { valid: true }
  }
}

const validateName = (name) => {
  return new Promise((resolve,reject)=>{
    const res = checkName(name);
    if( res.valid ){
      resolve(res)
    }else{
      reject(res)
    }
  })
}

const checkType = (program) => {
  const { hoc , func , type } = program;
  if( (hoc && func) || (type && (hoc || func) ) ){
    return { valid: false , err: codes.MULTI_TYPE };
  }else{
    if( !type ){
      if( hoc ){
        return { valid: true , type: "hoc"   }
      }else if( func ){
        return { valid: true , type: "func"  }
      }else{
        return { valid: true , type: "class" }
      }
    }else{
      if( type === true ){
        return { valid: false , err: codes.WRONG_TYPE};
      }
    }
  }
}

const validateType = (program) => {
  return new Promise((resolve,reject)=>{
    res = checkType(program);
    if( res.valid ){
      resolve(res)
    }else{
      reject(res)
    }
  })
}

const validate = (program,name) => {
  return new Promise((resolve, reject)=>{
    validateName(name)
    .then(()=>{
      return validateType(program)
    })
    .then((res)=>{
      resolve(res)
    })
    .catch((err)=>{
      reject(err)
    })
  })
}

const getProps = (program) =>{
  const { props } = program;
  let propList = [];
  if(props){
    propList = props.split(",");
  }
  return propList
}

const getStyle = (program,info) => {
  const { styled , css } = program;
  let style = {}

  if( styled ){
    if( styled === true ){
      style.js = `${info.name.toLowerCase()}Style`
    }else{
      style.js = styled
    }
  }

  if( css ){
    if( css === true ){
      style.css = info.name.toLowerCase()
    }else{
      style.css = css
    }
  }

  return style;
}

const runProgram = (argv) => {
  let info = {}
  let componentInfo = {}
  program
    .version("1.0.0")
    .arguments('<name> [path]')
    .action( (name,file)=>{
      info = {
        name,
        path: file ? path.normalize(file) : './src/components'
      }
    })
    .option('--type <type>','choose component type, either func, hoc or class.',/^(func|hoc|class)$/i)
    .option('-f --func','create a functional component')
    .option('-i --hoc','create a higher order component')
    .option('-s --styled [name]','add js style to component. Ignored in HOCs.')
    .option('-c --css [class]','add class and create a css file. Ignored in HOCs.')
    .option('--verbose','shows additional information')
    .option('-p --props <props>','Specify the names of props to be passed on. If it is a functional component, destructuring of props will be used. If it is a HOC the props will be injected. The props must be separated by comma with no spaces.')
  program.parse(argv);
  validate(program,info.name)
  .then(({type}) => {
    const {verbose=false} = program
    componentInfo = {
      ...info,
      verbose,
      type,
      style: getStyle(program,info),
      props: getProps(program)
    }
    return writeComponent(componentInfo);
  })
  .then(() => messages.showSuccessMessage(componentInfo))
  .catch( (e) => { messages.showErrorMessage(e)});
}

const writeComponent = (info) => {
  switch (info.type) {
    case "hoc":
      return createHOC(info)
    case "func":
      return createFuncComponent(info)
    default:
      return createClassComponent(info)
  }
}

module.exports = {
  runProgram
}
