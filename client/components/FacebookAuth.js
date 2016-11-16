// dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

// components
import Title from '../components/Title'

// actions
import appLoading from '../actions/loading'
import authenticateUser from '../actions/authenticate-user'

// styles
import './FacebookAuth.sass'

class FacebookAuth extends Component {
  componentWillMount(){
    this.props.authenticateUser()
  }

  componentDidMount(){

  }
  componentDidUpdate(){

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
