'use-strict'

const fs = require('fs');
const path = require('path');

const pick = (keys, obj) => {
  return Object.keys(obj).reduce((acc, key) => keys.includes(key) ? { ...acc, [key]: obj[key] } : acc, {})
}

const checkDirectory = (dir) => {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

const createDirectory = (dir) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

const createFile = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

const getStyleStrings = (name, style = {}) => {
  let styleObj = ''
  let styleInline = ''

  if (style.js) {
    styleObj = `\nconst ${style.js} = {\n   //fill me with style \n}\n`
    styleInline = ` style={${style.js}} `

  }

  let cssClass = ''
  let cssStyle = ''

  if (style.css) {
    cssStyle = `import "./${name}.css"\n`
    cssClass = ` className="${style.css}"`
    if (!style.js) {
      styleInline += " "
    }
  }
  return {
    styleObj,
    styleInline,
    cssStyle,
    cssClass
  }
}

const getPropsDeconstruction = (props) => {
  if (props.length !== 0) {
    let res = "{"
    props.forEach((prop) => {
      res += ` ${prop} ,`
    })
    return res.slice(0, -1) + "}"
  } else {
    return 'props'
  }
}

const createComponent = (info, getContent) => {
  const { path: dir, name, props, style } = info;
  const content = getContent(info);
  const fullPath = path.join(dir, name)
  const fileName = path.join(fullPath, "index.js")
  return checkDirectory(dir).then(() => {
    return createDirectory(fullPath)
  }).then(() => {
    return createFile(fileName, content)
  }).then(() => {
    if (style.css) {
      const cssFileName = path.join(fullPath, `${name}.css`);
      const cssContent = `.${style.css} {\n\n}`
      return createFile(cssFileName, cssContent)
    } else {
      return true
    }
  }).then(() => {
    if (info.type === "cont") {
      const actions = path.join(fullPath, "actions.js")
      const constants = path.join(fullPath, "constants.js")
      const reducer = path.join(fullPath, "reducer.js")
      const reducerContent = `export default const ${name}Reducer = (state,action) => state;`
      const selectors = path.join(fullPath, "selectors.js")
      const selContent = `import { createSelector } from 'reselect';\n`
      return new Promise(function (resolve, reject) {
        createFile(actions, "")
          .then(() => createFile(constants, ""))
          .then(() => createFile(reducer, reducerContent))
          .then(() => createFile(selectors, selContent))
          .then(() => resolve(true))
          .catch(() => reject(false))
      });
    } else {
      return true
    }
  })
}

module.exports = {
  checkDirectory,
  createDirectory,
  createFile,
  getStyleStrings,
  getPropsDeconstruction,
  createComponent,
  pick
}
