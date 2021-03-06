const utils = require('./utils');

const getContent = (info) => {
  const { name, props, style, imports } = info;
  const { styleObj, styleInline, cssStyle, cssClass }
    = utils.getStyleStrings(name, style);

  const propsDec = utils.getPropsDeconstruction(props);
  const propsString = propsDec === 'props' ? '' : `    const ${propsDec} = this.props\n`

  return `import React from 'react'\n` +
    `${utils.getImports(imports)}${imports.length ? '\n' : ''}` +
    `${cssStyle}${styleObj}\n` +
    `class ${name} extends React.Component {\n\n` +
    `  constructor(props){\n` +
    `    super(props);\n` +
    `    this.state = {}\n` +
    `  }\n\n` +
    `  render(){\n` +
    `${propsString}` +
    `    return (\n` +
    `      <div${cssClass}${styleInline}>\n` +
    `         ${name}\n` +
    `      </div>\n` +
    `    )\n` +
    `  }\n\n}\n\nexport default ${name};`
}

const create = (info) => {
  return utils.createComponent(info, getContent)
}

create.getContent = getContent;

module.exports = create;