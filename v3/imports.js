import { reduce } from '@juan-utils/functions'

const es5 = (name) => `const ${name} = require("${name}")`;
const es6 = (name) => `import ${name} from '${name}'`;
const createImportGen = (importFn) => reduce((acc,next) => `${acc}${importFn(next)}\n`, "");

export const es5Import = createImportGen(es5)
export const es6Import = createImportGen(es6)