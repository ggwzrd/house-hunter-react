// dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { history } from '../store'

// material-ui
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'

// components
import Title from '../components/Title'

// actions
import appLoading from '../actions/loading'
import authenticateUser from '../actions/authenticate-user'

// styles
import './FacebookAuth.sass'

class FacebookAuth extends Component {
  componentDidMount(){
    console.log('authenticating user')
    this.props.authenticateUser()
    history.push('/')
  }
  render() {
    const { className } = this.props
    return(
      <div className="wrapper facebook-auth" >
        <RefreshIndicator
          size={50}
          left={70}
          top={0}
          loadingColor="#FF9800"
          status="loading"
        />
      </div>

    )
  }
}


export default connect(null, { appLoading, authenticateUser })(FacebookAuth)
