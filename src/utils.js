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

const createComponent = (info,getContent) => {
  const { path:dir , name , props, style } = info;
  const content = getContent(info);
  const fullPath = path.join(dir,name)
  const fileName = path.join(fullPath,"index.js")
  return checkDirectory(dir).then(()=>{
    return createDirectory(fullPath)
  }).then(()=>{
    return createFile(fileName,content)
  }).then(()=>{
    if(style.css){
      const cssFileName = path.join(fullPath,`${name}.css`);
      const cssContent  = `.${style.css} {\n\n}`
      return createFile(cssFileName,cssContent)
    }else{
      return true
    }
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
  createComponent,
  getStyleStrings,
  getPropsDeconstruction
}
