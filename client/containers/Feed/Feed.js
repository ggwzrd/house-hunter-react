// dependencies
import React, { Component } from 'react'
import { connect } from 'react-redux'

// actions
import appLoading from '../../actions/loading'
import fetchGroupsFeed from '../../actions/fetch-groups-feed'
import filterPosts from '../../actions/filter-posts'

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
    const { appLoading, fetchGroupsFeed } = this.props
    appLoading(true)
    // window.fbAsyncInit = function() {
    //   FB.init({
    //     appId: '1250395821686383',
    //     channelUrl: '//connect.facebook.net/en_US/all.js',
    //     status: true,
    //     cookie: true,
    //     xfbml: true,
    //     version: 'v2.3'
    //   })
    //
    //
    //   GROUPS.map((group) => {
    //     this.fetchGroupFeed(group)
    //   })
    // }.bind(this);
    //
    // // Load the SDK asynchronously
    // (function(d, s, id) {
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s); js.id = id;
    //   js.src = '//connect.facebook.net/en_US/sdk.js';
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
  }

  componentDidUpdate() {
    const { appLoading, posts, filterPosts } = this.props
    posts.length < 250 ? null : filterPosts(posts)
  }

  // fetchGroupFeed(group){
  //   const { appLoading, fetchGroupsFeed, facebookUser } = this.props
  //
  //   FB.api('/'+group.id+'/feed?limit=100&access_token='+facebookUser.accessToken,
  //   function(res) {
  //     if (!res || res.error) {
  //       console.error('Error occured', res.error);
  //       return false
  //     } else {
  //       console.log('completed fetching feed for group id: '+group.id);
  //       fetchGroupsFeed(res.data)
  //       return true
  //     }
  //   })
  // }


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

export default connect(mapStateToProps, { appLoading, fetchGroupsFeed, filterPosts })(Feed)
