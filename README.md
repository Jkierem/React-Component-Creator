# React Component Creator

Simple NodeJS command line tool to create React components.

## Usage

```shell
$ createComponent <name> [parentDirectory] [options]
```

The tool can create 5 types of components: Functional, Redux container, Styled component, Class or HOCs.
To create a functional component simply type `createComponent MyReactComponent ./I-Want-it-Here`.
This will create the following:

the file `./I-Want-it-Here/MyReactComponent/index.js`

```javascript
import React from 'react'

const MyReactComponent = (props) => {
	return(
      <div>
        MyComponent
      </div>
    )
}

export default MyReactComponent
```


- The default path it will use is "./src/components"
- If the path does not exist, it will not create the component
- Component names must start with an upper case letter
- The tool always creates a folder inside the given path with the component's name and a "index.js" file. This cannot be changed.
- Shorthand commands exist to create class, HOCs, container, styled and functional components. 
They are createClass, createHigher, createContainer, createStyled and createFunctional.

### Options

| Option | Info |
| ------ | ---- |
| `--type <type>` | this option is the long way of changing the component type. It accepts either func, hoc, styled, cont or class as the argument. the default type is func |
| `-c , --class`| create a class component. The same as `--type class`|
| `-f , --func` | create a functional component. The same as `--type func` |
| `-i , --hoc`  | create a higher order component. The same as `--type hoc` |
| `-r , --cont`| create a redux container component. The same as `--type cont`|
| `-s , --styled [tag]` | create a styled component using the [tag] tag. Tag name is not validated so unsupported html tags are counted as valid tags to create the component. The default tag is 'div'. Same as `--type styled` but this way the default tag will be used|
| `--inline [name]` | add a style through js. This will create an object [name] and add it as an inline style. The default [name] is the component's name followed by "Style". This option is ignored when creating a HOC |
| `--css [class]` | add style through a css file. This will create a css file with the component's name in the same folder as the index.js file and imported inside it. The css file will have a single class named [class]. The default value of [class] is the component's name in lower case. This option is ignored when creating a HOC. |
| `--hooks <hooks>` | this options add react hooks imports to the file. The hooks must be written as a single string of comma separated names i.e. "useMemo,useState,...". This option is ignored unless a functional component is created. If this option is set without an explicit component type, it created a functional component|
| `--imports <imports>` | this options adds extra imports to the component. The imports must be a single string of comma separated names i.e. "lodash,ramda,...". The generated imports look like the following: `import [importName] from '[importName]'`|
| `--props <props>` | this option adds props to the component. The props must be a single string of the prop names separated by a comma i.e. "color,onClick,...". If the component is a class component, a destructuring of "this.props"  will be added to the render method. If it's a functional component then argument destructuring will be used. If it's a HOC, they are ignored. |
| `--verbose` | show details of component creation|
| `--force-name` | disables component name validation. Not recommended |
| `--dry` | disables file creation. For easier developing|
| `--debug` | shorthand for `--verbose --dry`. For easier developing|
