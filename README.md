# React Component Creator

Simple NodeJS command line tool to create React components.

## Usage

```shell
$ createComponent <name> [parentDirectory] [options]
```

The tool can create 3 types of components: Functional, Class or HOCs.
To create a class component simply type `createComponent MyReactComponent ./I-Want-it-Here`.
This will create the following:

the file `./I-Want-it-Here/MyReactComponent/index.js`

```javascript
import React from 'react'

class MyReactComponent extends React.Component{

	constructor(props){
		super(props);
		this.state={}
	}

	render(){
		return(
      <div>
        MyComponent
      </div>
    )
	}

}

export default MyReactComponent
```


- The default path it will use is "./src/components"
- If the path does not exist, it will not create the component
- Component names must start with an upper case letter
- The tool always creates a folder inside the given path with the component's name and a "index.js" file. This cannot be changed.
- Shorthand commands exist to create HOCs and functional components. They are createHOC and createPure.

### Options

| Option | Info |
| ------ | ---- |
| `-f , --func` | create a functional component. The same as `--type func` |
| `-i , --hoc`  | create a higher order component. The same as `--type hoc` |
| `-s , --styled [name]` | add a style through js. This will create an object [name] and add it as an inline style. The default [name] is the component's name followed by "Style". This option is ignored when creating a HOC |
| `-c , --css [class]` | add style through a css file. This will create a css file with the component's name in the same folder as the index.js file and imported inside it. The css file will have a single class named [class]. The default value of [class] is the component's name in lower case. This option is ignored when creating a HOC. |
| `--type <type>` | this option is the long way of changing the component type. It accepts either func, hoc or class as the argument. the default type is class |
| `-p --props <props>` | this option adds props to the component. The props must be a single string of the prop names separated by a comma i.e. "color,onClick,...". If the component is a class component, a destructuring of "this.props"  will be added to the render method. If it's a functional component then argument destructuring will be used. If it's a HOC, they are ignored. |
| `--verbose` | show details of component creation. As of this version this only shows the styling details. |
