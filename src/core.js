'use-strict'

const utils = require('./utils.js');

const createComponent = (info,getContent) => {
  const { path:dir , name , props, style } = info;
  const content = getContent(info);
  const fullPath = path.join(dir,name)
  const fileName = path.join(fullPath,"index.js")
  return utils.checkDirectory(dir).then(()=>{
    return utils.createDirectory(fullPath)
  }).then(()=>{
    return utils.createFile(fileName,content)
  }).then(()=>{
    if(style.css){
      const cssFileName = path.join(fullPath,`${name}.css`);
      const cssContent  = `.${style.css} {\n\n}`
      return utils.createFile(cssFileName,cssContent)
    }else{
      return true
    }
  })
}

module.exports = {
  createComponent
}
