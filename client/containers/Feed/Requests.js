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

  componentWillMount(){
    const { appLoading } = this.props
    appLoading(true)
  }

  componentDidMount(){
    const { requests } = this.props
    console.log('requests mounted')

    let clone = requests
    index = 0
    !!requests && facebookApi.initialized ? facebookApi.render(clone.slice(index, index + 5)) : null
  }

  componentDidUpdate(){
    const { requests } = this.props

    console.log('requests updated')
    let clone = requests
    if(!!requests && requests.length > index){
      if(facebookApi.initialized){
        const renderRequests = setInterval(function () {
          let requestsElements = document.getElementsByClassName('fb-post')
          if(requestsElements.length > index){
            facebookApi.render(requestsElements)
            index += 5
            setTimeout(appLoading.bind(null, false), 2000)
            clearInterval(renderRequests)
          }
        }, 100)
      }
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
    let clone = requests
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
            { !!requests ? clone.slice(index, index + 5).map(this.renderRequests.bind(this)) : null }
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
