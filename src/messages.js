'use-strict'

const chalk = require('chalk');
const warning = chalk.white.bgYellow;
const error = chalk.white.bgRed;
const highlight = chalk.greenBright;
const success = chalk.greenBright;
const title = chalk.cyanBright.bold;

const codes = require('./codes');

const showErrorMessage = (e) => {
  const { err } = e;
  switch (err) {
    case codes.WRONG_TYPE :
      console.log(`${error("Error:")} invalid type. Valid types are ${highlight("func")}, ${highlight("hoc")} and ${highlight("class")}`);
      break;
    case codes.MULTI_TYPE :
      console.log(`${error("Error:")} multiple types suppplied.`);
      break;
    case codes.NO_NAME    :
      console.log(`${error("Error:")} no name was supplied`);
      break;
    case codes.UPPERCASE  :
      console.log(`${warning("Warning:")} name must start with uppercase letter`)
      break;
    default:
      console.log(`${error("Unexpected Error:")} ${e}`);
      console.log(e);
      break;
  }
  console.log(chalk.yellow("Stopped execution due to error"));
}


const showSuccessMessage = (info) => {
  let styling = "";
  if( info.style ){
    if( info.style && info.style.js ){
      styling = `js `;
      if( info.verbose ){
        styling += `(using ${chalk.magenta(info.style.js)} object in ${chalk.magenta(".../"+info.name+"/index.js")} file)`
      }
    }
    if( info.style.css ){
      if(info.style.js) styling += ", "
      styling += `css `
      if( info.verbose ){
        styling += `(using ${chalk.magenta(info.style.css)} class in ${chalk.magenta(info.name+".css")} file)`
      }
    }
  }
  if(styling === ""){
    styling = "None"
  }

  let pString = "[";
  let plength = 0;
  if(info.props){
    plength = info.props.length
    info.props.forEach((prop)=>{
      pString = pString + ` ${prop} ,`
    })
  }
  pString = pString.slice(0,-1) + "]";
  const typeString = info.type === "func" ? "Functional" : info.type === "hoc" ? "Higher Order" : "Class";
  console.log(`${success("Success!")}`);
  console.log(`${title("Name:   ")} ${info.name}`);
  console.log(`${title("Path:   ")} ${info.path}`);
  console.log(`${title("Type:   ")} ${typeString} Component`);
  console.log(`${title("Props:  ")} ${plength > 0 ?  pString : "None" }`);
  console.log(`${title("Styling:")} ${styling}`);
}

module.exports = {
  showErrorMessage,
  showSuccessMessage
}
