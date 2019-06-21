'use-strict'

const utils = require('./utils');

const getContent = (info) => {
  const { name, props, style, hooks, imports } = info;
  const { getPropsDeconstruction: getProps, getHooksImport: getHooks, getImports } = utils;
  const { styleObj, styleInline, cssStyle, cssClass }
    = utils.getStyleStrings(name, style);

  return `import React${getHooks(hooks)} from 'react'\n` +
    `${getImports(imports)}${imports.length ? '\n' : ''}` +
    `${cssStyle}${styleObj}\n` +
    `const ${name} = (${getProps(props)}) => {\n` +
    `  return(\n` +
    `    <div${cssClass}${styleInline}>\n` +
    `      ${name}\n` +
    `    </div>\n` +
    `  )\n}\n\nexport default ${name};`
}

const create = (info) => {
  return utils.createComponent(info, getContent)
}

create.getContent = getContent;

module.exports = create;
