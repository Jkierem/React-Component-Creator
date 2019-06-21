'use-strict'

const utils = require('./utils');

const getContent = (info) => {
    const { name, imports, style: { styled } } = info;

    return `import styled from 'styled-components'\n` +
        `${utils.getImports(imports)}${imports.length ? '\n\n' : '\n'}` +
        `const ${name} = styled.${styled}\`\`\n\n` +
        `export default ${name}`;
}

const create = (info) => {
    return utils.createComponent(info, getContent)
}

create.getContent = getContent;

module.exports = create;