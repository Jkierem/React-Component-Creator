const utils = require('./utils');

const getContent = (info) => {
  const { name , props , style } = info;
  const { styleObj , styleInline , cssStyle , cssClass }
  = utils.getStyleStrings(name,style);

  const propsDec = utils.getPropsDeconstruction(props);
  const propsString = propsDec === 'props' ? '' : `    const ${propsDec} = this.props\n`

  return `import React from 'react'\n` +
         `import { connect } from 'redux'\n` +
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
         `  }\n\n}\n\n`+
         `const mapStateToProps = (state) => ({ state })\n\n`+
         `const mapDispatchToProps = (dispatch) => ({ dispatch })\n\n`+
         `export default connect(mapStateToProps,mapDispatchToProps)(${name});`
}

module.exports = (info) => {
  return utils.createComponent(info,getContent)
}
