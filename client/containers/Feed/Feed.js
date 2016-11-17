// dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import facebookApi from '../../middleware/facebook-api'

// actions
import appLoading from '../../actions/loading'
import fetchGroupsFeed from '../../actions/fetch-groups-feed'
import filterPosts from '../../actions/filter-posts'

// components
import Offers from './Offers'
import Requests from './Requests'
import CircularProgress from 'material-ui/CircularProgress'
import RefreshIndicator from 'material-ui/RefreshIndicator'

// styles
import './Feed.sass'

class Feed extends Component {

  componentWillMount(){
    const { appLoading, fetchGroupsFeed} = this.props
    appLoading(true)
    const fetchGroups = setInterval(()  => {
      if(facebookApi.initialized && facebookApi.feed.length > 250){
        fetchGroupsFeed(facebookApi.feed)
        clearInterval(fetchGroups)
      }
    }, 200);

  }

  componentDidUpdate() {
    const { appLoading, posts, filterPosts, loading  } = this.props

    if(posts.all.length > 200 && !posts.hasOwnProperty('offers')){
      filterPosts(posts.all)
    }
  }


  render() {
    const { posts, label, currentPage, facebookUser, loading } = this.props

    return (
      <div className="feed" >
        <h1 id="status">{ label }</h1>
        <RefreshIndicator
          size={50}
          left={100}
          top={300}
          style={!loading ? Object.assign({ 'position': 'absolute', 'marginLeft': 'calc(40% - 10px)'}, {'display': 'none'}) : { 'position': 'absolute', 'marginLeft': 'calc(40% - 10px)'} }
          loadingColor="#4080ff"
          status="loading"
        />
        <Offers offers={ posts.offers ? posts.offers.slice(0, 4) : [] } className={`offers ${currentPage.name === 'offers' && !loading ? "animation-slide-in-up" : 'hidden' }`} />
        <Requests requests={ posts.requests ? posts.requests.slice(0, 4) : [] } className={`requests ${currentPage.name === 'requests' && !loading ? "" : 'hidden' }`} />
      </div>
    )
  }
}

Feed.propTypes = {
  posts: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  facebookUser: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) =>{
  return {
    posts: state.groupsFeed,
    facebookUser: state.currentUser.facebook,
    currentPage: state.currentPage,
    loading: state.loading
  }
}

export default connect(mapStateToProps, { appLoading, fetchGroupsFeed, filterPosts })(Feed)
