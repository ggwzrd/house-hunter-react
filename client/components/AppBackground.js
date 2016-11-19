import React, { Component } from 'react'
import './AppBackground.sass'

class AppBackground extends Component {
  render() {
    const { imageUrl } = this.props

    return (
      <div style={{ 'background': `url("${imageUrl}") no-repeat` }} className="app-background"></div>
    )
  }
}

AppBackground.propTypes = {
  imageUrl: React.PropTypes.string.isRequired,
}

export default AppBackground
