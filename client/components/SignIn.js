// dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import CircularProgress from 'material-ui/CircularProgress';

// components
import Title from './Title'

// actions
import appLoading from '../actions/loading'

// styles
import './SignIn.sass'


class SignIn extends Component {
  componentWillMount(){

  }

  render() {
    const { className, authStatus } = this.props
    return(
      <div className={ `wrapper sign-in ${className ? className : "" }`} >
        <RefreshIndicator
          size={150}
          left={70}
          top={100}
          style={{ position: 'absolute', 'marginLeft': '40%'}}
          loadingColor="#4080ff"
          status="loading"
        />
        <Title color="#FFF" label="Please sign in to use this app" />
        <CircularProgress size={80} />
        <RaisedButton className={ `login ${className ? className : "" }`} label="Primary" primary={true} label={ authStatus === "not_connected" ? "Sign in with Facebook" : "Authorize with Facebook" } href={ authStatus === "not_connected" ? "https://en-gb.facebook.com/login/" : "auth/facebook" }/>
      </div>
    )
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  authStatus: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    authStatus: state.currentUser.authStatus
  }
}

export default connect(mapStateToProps, { appLoading })(SignIn)
