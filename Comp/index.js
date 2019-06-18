import React from 'react'

class Comp extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    const { OnClick , color , flah } = this.props
    return (
      <div>
         Comp
      </div>
    )
  }

}

export default Comp;