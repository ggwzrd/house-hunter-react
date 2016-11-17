import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


// actions
import appLoading from '../actions/loading'

// components
import Title from '../components/Title'
import Feed from './Feed/Feed'

// styles
import './Home.sass'

class Home extends Component {

  componentDidMount(){
    this.props.appLoading(false)
  }

  render() {
    return(
      <div className="home">
        <Title />
      </div>
    )
  }
}

export default connect(null, { appLoading })(Home)
