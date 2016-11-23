import React, { Component } from 'react'
import './Logo.sass'

class AppBackground extends Component {
  render() {
    const { imageUrl } = this.props

    return (
      <a href="http://househunter.codaisseur.cloud/offers"> <div className="logo" ></div></a>
    )
  }
}

AppBackground.propTypes = {
  imageUrl: React.PropTypes.string.isRequired,
}

export default AppBackground
