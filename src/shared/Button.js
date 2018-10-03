import React from 'react'

class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id, onClick, active = false } = this.props
    const className = active ? 'is-active' : ''
    return (
      <button id={id} className={className} onClick={onClick}>
        {this.props.children}
      </button>
    )
  }
}

export default Button
