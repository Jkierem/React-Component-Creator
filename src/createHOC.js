'use-strict'

const pt = require('path');
const utils = require('./utils');

const createHOC = (info) => {
  const { name , path } = info;

  let content=
    `import React from 'react'\n\n` +
    `const ${name} = (WrappedComponent) => {\n` +
    `    return{\n` +
    `      class extends React.Component {\n` +
    `        constructor(props){\n` +
    `           super(props);\n` +
    `           this.state = {}\n` +
    `        }\n\n` +
    `        render(){\n` +
    `          return(\n` +
    `            <WrappedComponent\n` +
    `              {...this.props}\n` +
    `            />\n` +
    `          )\n` +
    `        }\n\n` +
    `      }\n` +
    `    }\n` +
    `}\n` +
    `\nexport default ${name};\n`;
  const fullPath = pt.join(path,name);
  const fileName = pt.join(fullPath,"index.js");
  return utils.checkDirectory(path).then(()=>{
    return utils.createDirectory(fullPath)
  }).then(()=>{
    return utils.createFile(fileName,content)
  })
}

module.exports = createHOC
