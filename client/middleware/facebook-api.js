// dependencies
import io from 'socket.io-client';
import feathers from 'feathers-client';


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

class FacebookApi {

  constructor(){
    this.user = {}
    this.feed = []
  }

  init(){
    window.fbAsyncInit = function() {
      FB.init({
        appId: '1250395821686383',
        channelUrl: '//connect.facebook.net/en_US/all.js',
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v2.3'
      })

      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));

      GROUPS.map((group) => {
        this.fetchGroupFeed(group)
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

  setUser(fbUser){
    this.user = fbUser
  }

  fetchGroupFeed(group){
    FB.api('/'+group.id+'/feed?limit=100&access_token='+ this.user.accessToken,
    function(res) {
      if (!res || res.error) {
        console.error('Error occured', res.error);
        return false
      } else {
        console.log('completed fetching feed for group id: '+group.id);
        this.feed = this.feed.concat(res.data)
        return
      }
    }.bind(this))
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI(){

    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {

      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    // const { authenticateUser } = this.props
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      Object.assign(this.user, {authStatus: "connected"})
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      Object.assign(this.user, {authStatus: "not_authorized"})
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      Object.assign(this.user, {authStatus: "not_connected"})
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

}



export default FacebookApi
