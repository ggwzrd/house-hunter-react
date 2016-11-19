// dipendencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import LazyLoad from 'react-lazyload'
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
import './Feed.sass'

let index = 0

class Requests extends Component {

  componentWillMount(){
    const { appLoading } = this.props
    appLoading(true)
  }

  componentDidMount(){
    const { requests } = this.props
    console.log('requests mounted')

    let clone = requests
    index = 0
  }

  componentDidUpdate(){
    const { appLoading } = this.props

    if(facebookApi.initialized){
      const renderRequests = setInterval(function () {
        let requestsElements = document.getElementsByClassName('fb-post')
        facebookApi.render(requestsElements)
        setTimeout(appLoading.bind(null, false), 700)
        clearInterval(renderRequests)
      }, 100)
    }
  }

  renderRequests(requests, index){
    const { loading } = this.props

    return(
      <LazyLoad key={ index } offset={100} height={400} once={true}>
        <div>
          <RefreshIndicator
            size={50}
            left={0}
            top={100}
            status={loading ? "loading"  : "hide" }
            style={{ 'position': 'relative', 'zIndex': '1000'}}
            loadingColor="#4080ff"
          />
          <Paper className="post-container" zDepth={2} >
            <Heart postId={ requests.postId } groupId={ requests.groupId } message={ requests.message } />
            <div className="fb-post"
              data-href={ `https://www.facebook.com/${requests.groupId}/posts/${requests.postId}/` }
              data-width="380">
            </div>
          </Paper>
        </div>
      </LazyLoad>
        )
  }
  render() {
    const { requests } = this.props

    return (
      <div className="feed">
        { !!requests ? requests.map(this.renderRequests.bind(this)) : null }
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
