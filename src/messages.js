'use-strict'

const chalk = require('chalk');
const warning = chalk.white.bgYellow;
const error = chalk.white.bgRed;
const highlight = chalk.greenBright;
const success = chalk.greenBright;
const title = chalk.cyanBright.bold;
const emphasis = chalk.magenta;

const codes = require('./codes');

const showErrorMessage = (e) => {
  switch (e) {
    case codes.WRONG_TYPE:
      console.log(`${error("Error:")} invalid type. Valid types are ${highlight("func")}, ${highlight("hoc")}, ${highlight("cont")}, ${highlight("styled")} and ${highlight("class")}`);
      break;
    case codes.MULTI_TYPE:
      console.log(`${error("Error:")} multiple types suppplied.`);
      break;
    case codes.NO_NAME:
      console.log(`${error("Error:")} no name was supplied`);
      break;
    case codes.UPPERCASE:
      console.log(`${warning("Warning:")} name must start with uppercase letter`)
      break;
    case codes.INVALID_STYLE:
      console.log(`${error('Error:')} style options are invalid. Only one styling type is allowed`)
      break;
    case codes.PATH_NOT_FOUND:
      console.log(`${error('Error:')} path is nowhere to be found`)
      break;
    default:
      console.log(`${error("Unexpected Error:")} ${e}`);
      console.log(e);
      break;
  }
  console.log(chalk.yellow("Stopped execution due to error"));
}


const showSuccessMessage = (info) => {
  let styling = "None";
  if (info.style) {
    if (info.style.js) {
      styling = `js `;
      if (info.verbose) {
        styling += `(using ${emphasis(info.style.js)} object in ${emphasis(info.path + '/' + info.name + "/index.js")} file)`
      }
    }
    if (info.style.css) {
      styling = `css `
      if (info.verbose) {
        styling += `(using ${emphasis(info.style.css)} class in ${emphasis(info.name + ".css")} file)`
      }
    }
    if (info.style.styled || info.type === 'styled') {
      styling = `js `
      if (info.verbose) {
        styling += `(using ${emphasis(info.style.styled)} styled component tag in ${emphasis(info.path + '/' + info.name + "/index.js")})`
      }
    }
  }
  const arrayNotationOrNone = (data) => data.length ? `[ ${data.join(', ')} ]` : 'None'
  const props = arrayNotationOrNone(info.props)
  const hooks = arrayNotationOrNone(info.hooks);
  const imports = arrayNotationOrNone(info.imports);
  const implicit = info.verbose ? ` (implicit ${emphasis(info.type === "styled" ? 'styled-components' : 'React')})` : '';
  const ignoredHooks = info.type !== "func" && info.hooks.length !== 0 ? ` (${emphasis("ignored")})` : ''

  const typeString =
    info.type === "func" ? "Functional" :
      info.type === "hoc" ? "Higher Order" :
        info.type === "cont" ? "Container" :
          info.type === "styled" ? "Styled" :
            "Class";
  console.log(`${success("Success!")}`);
  console.log(`${title("Name:   ")} ${info.name}`);
  console.log(`${title("Path:   ")} ${info.path}`);
  console.log(`${title("Type:   ")} ${typeString} Component`);
  console.log(`${title("Styling:")} ${styling}`);
  console.log(`${title("Props:  ")} ${props}`);
  console.log(`${title("Hooks:")}   ${hooks}${ignoredHooks}`);
  console.log(`${title("Imports:")} ${imports}${implicit}`)
}

const showDebug = (should, content) => {
  if (should) {
    console.log(`\n\n${emphasis("File Content: ")}`)
    console.log(`${content}`)
  }
}

module.exports = {
  showErrorMessage,
  showSuccessMessage,
  showDebug
}
