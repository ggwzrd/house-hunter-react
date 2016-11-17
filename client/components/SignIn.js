// dependencies
import React, { Component, PropTypes } from 'react'
import {Router, Route, Link, RouteHandler} from 'react-router'
import { connect } from 'react-redux'
import facebookApi from '../middleware/facebook-api'

// material-ui
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import CircularProgress from 'material-ui/CircularProgress'

// components
import Title from './Title'

// actions
import appLoading from '../actions/loading'
import updateAuthStatus from '../actions/update-auth-status'

// styles
import './SignIn.sass'

class SignIn extends Component {
  componentWillMount(){
    facebookApi.setUser(this.props.currentUser.facebook)
    facebookApi.init()
  }

  componentDidMount(){
    const { authStatus } = this.props.currentUser
    const loginStatus = setInterval(function() {
      facebookApi.initialized ? facebookApi.checkLoginState() : null
      authStatus !== facebookApi.user.authStatus ? this.props.updateAuthStatus({ authStatus: facebookApi.user.authStatus }) : null
    }.bind(this), 3000)
  }

  handleClick(){
    const { authStatus } = this.props.currentUser

    authStatus === "not_connected" ? facebookApi.handleClick() : this.context.location.transitionTo('auth/facebook')
  }

  render() {
    const { authStatus } = this.props.currentUser

    return(
      <div className={ `wrapper sign-in ${authStatus === 'connected' ? 'hidden' : "" }`} >
        <Title color="#FFF" label="Please sign in to use this app" />
        <RefreshIndicator
          size={150}
          left={70}
          top={100}
          style={{ position: 'absolute', 'marginLeft': 'calc(39% - 10px)'}}
          loadingColor="#4080ff"
          status="loading"
        />
        <RaisedButton className={ authStatus === 'connected' ? 'login hidden' : 'login' } label="Primary" primary={true} label={ authStatus === "not_connected" ? "Sign in with Facebook" : "Authorize with Facebook" } onClick={ this.handleClick.bind(this) }/>
      </div>
    )
  }
}

SignIn.propTypes = {
  currentUser: PropTypes.object.isRequired,
}

SignIn.contextTypes = {
  location() {
    React.PropTypes.func.isRequired
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { appLoading, updateAuthStatus })(SignIn)
