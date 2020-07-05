export const ComponentTypes = {
    Class: "Class",
    HOC: "Higher Order",
    Container: "Container",
    Functional: "Functional",
}

const joinBy = (sep) => (...data) => data.join(sep);
const joinProps = joinBy(", ");
const joinLines = joinBy("\n");

const Functional = (name, props) => joinLines(
    `%imports%`,
    `%style:css%%style:sass%`,
    `const ${name} = (${ props.length ? `{ ${joinProps(...props)} }` : "props" }) => {`,
    `   return <div%style:tag%>${name}</div>`,
    `}`,
    ``,
    `%export%`
)

const ClassBased = (name, props) => {
    const lines = [
        `%imports%`,
        `%style:css%%style:sass%`,
        `class ${name} extends React.Component {`,
        `   constructor(props) {`,
        `       super(props);`,
        `   }`,
        ``,
        `   render(props){`,
        props.length == 0 ? undefined : 
        `       const { ${joinProps(...props)} } = props;`,
        `       return <div%style:tag%>${name}</div>`,
        `   }`,
        `}`,
        ``,
        `%export%`
    ].filter(x => x !== undefined);
    return joinLines(...lines);
}

const Styled = (name,component) => {
    return joinLines(
        `%imports%`,
        `import styled from "styled-components"`,
        ``,
        `const ${name} = styled.${component}\`\``,
        ``,
        `%export%`
    )
}

const HOC = () => {}

export const Components = {
    Class: ClassBased,
    HOC,
    Functional,
    Styled
}