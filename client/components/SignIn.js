// dependencies
import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import facebookApi from '../middleware/facebook-api'
import api from '../middleware/api'

// material-ui
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'

// components
import Title from './Title'

// actions
import appLoading from '../actions/loading'
import updateAuthStatus from '../actions/update-auth-status'
import updateFacebookUser from '../actions/update-facebook-user'

// styles
import './SignIn.sass'

class SignIn extends Component {

  componentWillMount(){
    const { currentUser } = this.props
    facebookApi.init()
    if(currentUser.hasOwnProperty('_id')){
      facebookApi.setUser(currentUser.facebook)
    }

  }

  componentDidMount(){
    const { updateAuthStatus, updateFacebookUser, currentUser } = this.props
    const loginStatus = setInterval(function() {
      // checking login state of the user in Facebook
      facebookApi.checkLoginState()
      // checking if facebook access token is expired and updating it if true
      if(currentUser.hasOwnProperty('_id')){
        if(JSON.parse(localStorage.getItem('hh.currentUser')) !== facebookApi.user.authStatus || (facebookApi.accessTokenExpired && facebookApi.initialized)){
          facebookApi.accessTokenExpired = false
          updateAuthStatus(Object.assign({}, currentUser, { facebook: facebookApi.user }))
        }

      }else{
        api.service('users').find({ facebookId: facebookApi.user.id })
          .then((res) =>{
            // checking if authStatus is changed and updating it if true
            console.log(res.data[0], facebookApi)
            res.data[0] && res.data[0].facebook.authStatus !== facebookApi.user.authStatus ?
              updateAuthStatus(Object.assign({}, res.data[0], { facebook: facebookApi.user })) : updateAuthStatus({ facebook: facebookApi.user })

            // updateFacebookUser(res.data[0] , {facebook: facebookApi.user})
          })
          .catch((error) => {
            console.log('User not found: ', error)
          })
      }
    }, 3000)
  }

  handleClick(){
    const { currentUser } = this.props
    console.log('current user:', currentUser )
    // handling the different cases (authorization or login)
    currentUser.hasOwnProperty('facebook') && currentUser.facebook.authStatus === 'not_authorized' ? window.location.replace('/auth/facebook') : facebookApi.handleClick()
  }

  componentDidUpdate(){
    console.log('sign in updated')

  }

  render() {
    const { currentUser } = this.props

    return(
      <div className={ `wrapper sign-in ${ currentUser.hasOwnProperty('facebook') && currentUser.facebook.authStatus === 'connected' ? 'hidden' : null }`} >
        <img src="http://i.imgur.com/ZUD5bRp.png" className="logo-auth" />
        <RaisedButton
          className={ currentUser.hasOwnProperty('facebook') && currentUser.facebook.authStatus === 'connected' ? 'login hidden' : 'login' }
          primary={true}
          label={ currentUser.hasOwnProperty('facebook') && currentUser.facebook.authStatus === "not_authorized" ? "Authorize with Facebook" : "Sign in with Facebook" }
          onClick={ this.handleClick.bind(this) }
        />
      </div>
    )
  }
}

SignIn.propTypes = {
  currentUser: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { appLoading, updateAuthStatus, updateFacebookUser })(SignIn)
