export const StyleTypes = {
    Inline: "Inline",
    Css: "Css",
    Sass: "Sass",
    None: "None"
}

const symbolTable = (overrides) => ({
    "style:css": "",
    "style:sass": "",
    "style:tag": "",
    ...overrides
})

const replaceSymbols = (symbolTable) => (str) => {
    return str.replace(/%[a-zA-Z0-9_:]*%/gm,(symbol) => symbolTable[symbol.replace(/%/g,"")] || symbol)
}

const css = (componentStr,className,fileName) => {
    return replaceSymbols(symbolTable({
        "style:css": `import "./${fileName}.css"`,
        "style:tag": ` className=${className} `,
    }))(componentStr)
}

const sass = (componentStr,className,fileName) => {
    return replaceSymbols(symbolTable({
        "style:sass": `import "./${fileName}.scss"`,
        "style:tag": ` className=${className}`,
    }))(componentStr)
}

const inline = (componentStr) => {
    return replaceSymbols(symbolTable({
        "style:tag": ` style={{ /* style me up */ }} `,
    }))(componentStr)
}

const none = (componentStr) => {
    return replaceSymbols(symbolTable({}))(componentStr)
}

export {
    css, sass, inline, none
}