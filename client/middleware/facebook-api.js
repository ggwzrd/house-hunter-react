import io from 'socket.io-client';
import feathers from 'feathers-client';
import { connect } from 'react-redux'

let FB = {}

class FacebookApi {

  constructor(){
    window.fbAsyncInit = function() {
      FB.init({
        appId: '1250395821686383',
        channelUrl: '//connect.facebook.net/en_US/all.js',
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v2.3'
      })

    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  fetchGroupFeed(group){
    const { appLoading, fetchGroupsFeed, facebookUser } = this.props

    FB.api('/'+group.id+'/feed?limit=100&access_token='+facebookUser.accessToken,
    function(res) {
      if (!res || res.error) {
        console.error('Error occured', res.error);
        return false
      } else {
        console.log('completed fetching feed for group id: '+group.id);
        fetchGroupsFeed(res.data)
        return true
      }
    })
  }

}
