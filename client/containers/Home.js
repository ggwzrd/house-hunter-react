import React, { Component, PropTypes } from 'react'

// components
import Title from '../components/Title'
import Feed from './Feed/Feed'

// styles
import './Home.sass'

class Home extends Component {
  render() {
    return(
      <div className="home">
        <Title />
        <Feed />
      </div>
    )
  }
}

export default Home
