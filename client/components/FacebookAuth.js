// dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

// actions
import appLoading from '../actions/loading'
import updateAuthStatus from '../actions/update-auth-status'

// styles
import './FacebookAuth.sass'

class FacebookAuth extends Component {
  componentWillMount(){
    const { appLoading, fetchGroupsFeed } = this.props
    window.fbAsyncInit = function() {
      FB.init({
        appId: '1250395821686383',
        channelUrl: '//connect.facebook.net/en_US/all.js',
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v2.3'
      })
      this.watchLoginChange()
    }.bind(this);
    // Load the SDK asynchronously
    (function(d){
      // load the Facebook javascript SDK
      var js,
      id = 'facebook-jssdk',
      ref = d.getElementsByTagName('script')[0]

      if (d.getElementById(id)) {
        return;
      }

      js = d.createElement('script')
      js.id = id
      js.async = true
      js.src = '//connect.facebook.net/en_US/all.js'

      ref.parentNode.insertBefore(js, ref)

    }.bind(this)(document));
  }

  watchLoginChange(){
    FB.Event.subscribe('auth.authResponseChange', function(res) {
      debugger
      if (res.status === 'connected') {
        console.log(res.status)
      }else{
        console.log(res.status)
        $('.status').innerHTML = 'Please log ' +
        'into this app.'
      }
    })
  }

  render() {
    const { className } = this.props
    return(
      <div className={'wrapper'}>
        <RaisedButton className={ `login ${className ? className : "" }`} label="Primary" primary={true} label="Authorize" href="auth/facebook"/>
      </div>

    )
  }
}

FacebookAuth.propTypes = {
  className: PropTypes.string,
  authStatus: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    authStatus: state.currentUser.authStatus
  }
}

export default connect(mapStateToProps, { appLoading, updateAuthStatus })(FacebookAuth)
