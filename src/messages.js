'use-strict'

const chalk = require('chalk');
const warning = chalk.white.bgYellow;
const error = chalk.white.bgRed;
const highlight = chalk.greenBright;
const success = chalk.greenBright;
const title = chalk.cyanBright.bold;

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
        styling += `(using ${chalk.magenta(info.style.js)} object in ${chalk.magenta(".../" + info.name + "/index.js")} file)`
      }
    }
    if (info.style.css) {
      styling = `css `
      if (info.verbose) {
        styling += `(using ${chalk.magenta(info.style.css)} class in ${chalk.magenta(info.name + ".css")} file)`
      }
    }
    if (info.style.styled) {
      styling = `js `
      if (info.verbose) {
        styling += `(using ${chalk.magenta(info.style.styled)} styled component tag in ${chalk.magenta(".../" + info.name + "/index.js")})`
      }
    }
  }

  let pString = info.props.length ? `[ ${info.props.join(', ')} ]` : 'None'

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
  console.log(`${title("Props:  ")} ${pString}`);
  console.log(`${title("Styling:")} ${styling}`);
}

module.exports = {
  showErrorMessage,
  showSuccessMessage
}
