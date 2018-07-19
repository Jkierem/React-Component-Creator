'use-strict'

const utils = require('./utils');
const core = require('./core');

const getContent = (info) => {
  const { name , props , style } = info;
  const { getPropsDeconstruction:getProps } = utils;
  const { styleObj , styleInline , cssStyle , cssClass }
  = utils.getStyleStrings(name,style);

  return `import React from 'react'\n`+
         `${cssStyle}${styleObj}\n` +
         `const ${name} = (${getProps(props)}) => {\n` +
         `  return(\n` +
         `    <div${styleInline}${cssClass}>\n` +
         `      ${name}\n` +
         `    </div>\n` +
         `  )\n}\n\nexport default ${name};`
}

const createFuncComponent = (info) => {
  return core.createComponent(info,getContent)
}

module.exports = createFuncComponent
