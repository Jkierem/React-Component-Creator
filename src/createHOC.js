'use-strict'

const pt = require('path');
const utils = require('./utils');

const getContent = (info) => {
  const { name, imports } = info;

  const content =
    `import React from 'react'\n` +
    `${utils.getImports(imports)}${imports.length ? '\n\n' : '\n'}` +
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
  return content;
}

const createHOC = (info) => {
  const { name, path } = info;

  let content = getContent(info)
  const fullPath = pt.join(path, name);
  const fileName = pt.join(fullPath, "index.js");
  return utils.checkDirectory(path).then(() => {
    return utils.createDirectory(fullPath)
  }).then(() => {
    return utils.createFile(fileName, content)
  })
}

createHOC.getContent = getContent;

module.exports = createHOC
