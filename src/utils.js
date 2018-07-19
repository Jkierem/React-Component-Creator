'use-strict'

const fs = require('fs');
const path = require('path');

const checkDirectory = (dir) =>{
  return new Promise((resolve,reject)=>{
    fs.stat( dir , (err,stats)=>{
      if(err){
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}

const createDirectory = (dir) => {
  return new Promise((resolve,reject)=>{
    fs.mkdir( dir , (err)=>{
      if(err){
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}

const createFile = (path,content) => {
  return new Promise((resolve,reject)=>{
    fs.writeFile(path,content,(err)=>{
      if(err){
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}

const getStyleStrings = (name,style) =>{
  let styleObj = ''
  let styleInline = ''

  if (style.js){
    styleObj = `\nconst ${style.js} = {\n   //fill me with style \n}\n`
    styleInline = ` style={${style.js}}`
    if (!style.css){
      styleInline += " "
    }
  }

  let cssClass = ''
  let cssStyle = ''

  if (style.css){
    cssStyle = `import "./${name}.css"\n`
    cssClass = ` className="${style.css}" `
  }
  return {
    styleObj,
    styleInline,
    cssStyle,
    cssClass
  }
}

const getPropsDeconstruction = (props) => {
  if(props.length !== 0){
    let res = "{"
    props.forEach((prop)=>{
      res += ` ${prop} ,`
    })
    return res.slice(0,-1) + "}"
  }else{
    return 'props'
  }
}

module.exports = {
  checkDirectory,
  createDirectory,
  createFile,
  getStyleStrings,
  getPropsDeconstruction
}
