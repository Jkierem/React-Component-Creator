'use-strict'

const utils = require('./utils');

const getContent = (info) => {
    const { name, style: { styled } } = info;

    return `import styled from 'styled-components'\n\n` +
        `const ${name} = styled.${styled}\`\`\n\n` +
        `export default ${name}`;
}

module.exports = (info) => {
    return utils.createComponent(info, getContent)
}