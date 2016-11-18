// dipendencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import facebookApi from '../../middleware/facebook-api'

// actions
import appLoading from '../../actions/loading'

// material-ui
import Paper from 'material-ui/Paper'
import RefreshIndicator from 'material-ui/RefreshIndicator'

// components
import Title from '../../components/Title'
import Heart from '../../components/Heart'

// styles
import './Requests.scss'

let index = 0

class Requests extends Component {

  componentDidMount(){
    const { requests } = this.props
    console.log('requests mounted')
    index = 0
    !!requests && facebookApi.initialized ? facebookApi.render(requests.slice(index, index + 5)) : null
  }

  componentDidUpdate(){
    const { requests } = this.props

    console.log('requests updated')
    if(!!requests && requests.length > index){
      index += requests.length
      facebookApi.initialized ? facebookApi.render(requests.slice(index, index + 5)) : null
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
    const { requests, loading, currentPage } = this.props

    return (
      <div>
        <RefreshIndicator
          size={50}
          left={100}
          top={300}
          style={!loading ? Object.assign({ 'position': 'absolute', 'marginLeft': 'calc(40% - 10px)'}, {'display': 'none'}) : { 'position': 'absolute', 'marginLeft': 'calc(40% - 10px)'} }
          loadingColor="#4080ff"
          status="loading"
        />
        <div className={`requests ${currentPage.name === 'requests' && !loading ? "" : 'hidden' }`}>
          <div className="list-post">
            { !!requests ? requests.slice(index, index + 5).map(this.renderRequests.bind(this)) : null }
          </div>
        </div>
      </div>
    )
  }
}

Requests.propTypes = {
  requests: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  currentPage: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return{
    requests: state.groupsFeed.requests,
    loading: state.loading,
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps, { appLoading })(Requests)
