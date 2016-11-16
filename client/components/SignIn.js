// dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

// actions
import appLoading from '../actions/loading'
import authenticateUser from '../actions/authenticate-user'

class SignIn extends Component {
  componentWillMount(){
    this.props.authenticateUser()
  }
  
  render() {
    return(
      <div>
      </div>

    )
  }
}

export default connect(null, { appLoading, authenticateUser })(SignIn)
