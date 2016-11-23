import React, { Component } from 'react'
import './Logo.sass'

class AppBackground extends Component {
  render() {
    const { imageUrl } = this.props

    return (
      <img src={imageUrl} className="logo" />
    )
  }
}

AppBackground.propTypes = {
  imageUrl: React.PropTypes.string.isRequired,
}

export default AppBackground
