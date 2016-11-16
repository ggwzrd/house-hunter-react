import React, { Component } from 'react'
import './Title.sass'

class Title extends Component {
  render() {
    const { label, color } = this.props

    return (
      <h1 style={{ color: color }} id="status">{ label }</h1>
    )
  }
}

export default Title
