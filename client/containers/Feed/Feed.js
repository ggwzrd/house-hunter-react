// dependencies
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FacebookApi from '../../middleware/facebook-api'

// actions
import appLoading from '../../actions/loading'
import fetchGroupsFeed from '../../actions/fetch-groups-feed'
import filterPosts from '../../actions/filter-posts'
import updateAuthStatus from '../../actions/update-auth-status'

// styles
import './Feed.sass'

const facebookApi = new FacebookApi()

class Feed extends Component {

  componentWillMount(){
    const { appLoading, fetchGroupsFeed, facebookUser } = this.props
    appLoading(true)
    facebookApi.setUser(facebookUser)
    facebookApi.init()
  }

  componentDidMount(){
    const { fetchGroupsFeed, updateAuthStatus } = this.props
    setTimeout(function () {
      updateAuthStatus({ authStatus: facebookApi.user.authStatus })
      fetchGroupsFeed(facebookApi.feed)

    }, 3000);
  }

  componentDidUpdate() {
    const { appLoading, posts, filterPosts } = this.props
    posts.length < 250 ? null : filterPosts(posts)
  }

  render() {
    const { label } = this.props

    return (
      <h1 id="status">{ label }</h1>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    posts: state.groupsFeed.all,
    facebookUser: state.currentUser.facebook
  }
}

export default connect(mapStateToProps, { appLoading, fetchGroupsFeed, filterPosts, updateAuthStatus })(Feed)
