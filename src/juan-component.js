const path = require('path');
const program = require('commander');
const chalk = require('chalk');

const warning = chalk.white.bgYellow;
const error = chalk.white.bgRed;
const highlight = chalk.greenBright;
const success = chalk.greenBright;
const title = chalk.cyanBright.bold;

const createHOC = require('./createHOC')
const createFuncComponent = require('./createFuncComponent');
const createClassComponent = require('./createClassComponent');

const checkType = (program) =>{
  const { hoc , func , type } = program;
  if( (hoc && func) || (type && (hoc || func) ) ){
    console.log(`${error("Error:")} multiple types suppplied.`);
    return true;
  }else{
    if( !type ){
      if( hoc ){
        program.type = "hoc"
      }else if( func ){
        program.type = "func"
      }else{
        program.type = "class"
      }
    }else{
      if( type === true ){
        console.log(`${error("Error:")} invalid type. Valid types are ${highlight("func")}, ${highlight("hoc")} and ${highlight("class")}`);
        return true;
      }
    }
  }
  return false;
}

const checkName = (name) => {
  if( name === undefined ){
    console.log(`${error("Error:")} no name was supplied`);
    return true
  }
  const c =  name.charAt(0);
  if( c !== c.toUpperCase() ){
    console.log(`${warning("Warning:")} name must start with uppercase letter`)
    return true
  }else{
    return false
  }
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


const successMsg = (info) => {
  let styling = "";
  if(info.style.js){
    styling = `js `;
    if( info.verbose ){
      styling += `(using ${chalk.magenta(info.style.js)} object in ${chalk.magenta(".../"+info.name+"/index.js")} file)`
    }
  }
  if(info.style.css){
    if(info.style.js) styling += ", "
    styling += `css `
    if( info.verbose ){
      styling += `(using ${chalk.magenta(info.style.css)} class in ${chalk.magenta(info.name+".css")} file)`
    }
  }
  if(styling === ""){
    styling = "None"
  }

  let pString = "[";
  info.props.forEach((prop)=>{
    pString = pString + ` ${prop} ,`
  })
  pString = pString.slice(0,-1) + "]";
  const typeString = info.type == "func" ? "Functional" : info.type == "hoc" ? "Higher Order" : "Class";
  console.log(`${success("Success!")}`);
  console.log(`${title("Name:   ")} ${info.name}`);
  console.log(`${title("Path:   ")} ${info.path}`);
  console.log(`${title("Type:   ")} ${typeString} Component`);
  console.log(`${title("Props:  ")} ${info.props.length > 0 ?  pString : "None" }`);
  console.log(`${title("Styling:")} ${styling}`);
}

const errorMsg = (err) => {
  if(err){
    console.log(err);
  }
  console.log(chalk.yellow("Stopped execution due to error"));
}

const createComponent = (info) => {
  switch (info.type) {
    case "hoc":
      return createHOC(info)
    case "func":
      return createFuncComponent(info)
    default:
      return createClassComponent(info)
  }
}

let info = {}

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
  .parse(process.argv);

let hasErr = false;
hasErr = hasErr || checkType(program) || checkName(info.name);
const {type,verbose=false} = program

info = {
  ...info,
  type,
  verbose,
  style: getStyle(program,info),
  props: getProps(program)
}

if( hasErr ){
  errorMsg();
}else{
  createComponent(info)
  .then(() => successMsg(info))
  .catch((err) => errorMsg(err));
}
