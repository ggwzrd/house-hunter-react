// dependencies
import React, { Component } from 'react'
import { connect } from 'react-redux'

// actions
import appLoading from '../../actions/loading'

// styles
import './Feed.sass'

// costants
const GROUPS = [
  {
    id: '702616376420205',
    limit: '&limit=25'
  },
  {
    id: '437146056338664',
    limit: '&limit=25'
  },
  {
    id: '231203323708543',
    limit: '&limit=25'
  }
]

class Feed extends Component {
  componentWillMount(){
    const { appLoading } = this.props
    appLoading(true)

  }
  render() {
    const { label } = this.props

    return (
      <h1 id="status">{ label }</h1>
    )
  }
}

export default connect(null, { appLoading, })(Feed)
