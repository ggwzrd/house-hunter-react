// dipendencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import facebookApi from '../../middleware/facebook-api'

// actions
import appLoading from '../../actions/loading'

// material-ui
import Paper from 'material-ui/Paper'
import Heart from '../../components/Heart'

// components
import Title from '../../components/Title'

// styles
import './Requests.scss'

let index = 0

class Requests extends Component {

  componentDidMount(){
    const { requests } = this.props
    index = 0
    // facebookApi.initialized ? facebookApi.render(requests) : null
  }

  componentDidUpdate(){
    const { requests } = this.props
    if(requests.length > index){
      // facebookApi.initialized ? facebookApi.render() : null
      index = requests.length
    }
  }

  renderRequests(requests, index){
    return(
      <Paper key={ index } style={{ width: '500px', 'borderRadius': '4px' }} zDepth={1} >
        <Heart postId={ requests.postId } groupId={ requests.groupId } message={ requests.message } />
        <div className="fb-post"
          data-href={ `https://www.facebook.com/${requests.groupId}/posts/${requests.postId}/` }
          data-width="500">
        </div>
      </Paper>
    )
  }
  render() {
    const { requests, className } = this.props

    return (
      <div className={ className }>
        <div className="list-post">
          { requests.map(this.renderRequests.bind(this)) }
        </div>
      </div>
    )
  }
}

Requests.propTypes = {
  requests: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
}

export default connect(null, { appLoading })(Requests)
