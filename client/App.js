import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ChatTheme from './styles/base-theme'
import facebookApi from './middleware/facebook-api'

// material-ui elements
import LinearProgress from 'material-ui/LinearProgress'

// components
import SignIn from './components/SignIn'
import Navbar from './containers/Navbar'
import FavouritesList from './containers/FavouritesList'
import AppBackground from './components/AppBackground'
import FeedbackForm from './containers/Feedback/FeedbackForm'

// actions
import appLoading from './actions/loading'
import fetchGroupsFeed from './actions/fetch-groups-feed'
import filterPosts from './actions/filter-posts'

// style
import './App.sass'
import './styles/tablet.scss'
import './styles/mobile.scss'

class App extends Component {

  componentWillMount(){
    const { posts } = this.props

    const startFetch = setInterval(function () {
      if(facebookApi.initialized && !posts.hasOwnProperty('offers')){
        facebookApi.startFetch.bind(facebookApi)()
        clearInterval(startFetch)
      }
    }, 500);
  }

  componentDidMount(){
    const { fetchGroupsFeed, posts } = this.props
    const fetchGroups = setInterval(()  => {
      if(facebookApi.initialized && facebookApi.feed.length > 250 && !posts.hasOwnProperty('offers')){
        fetchGroupsFeed(facebookApi.feed)
        clearInterval(fetchGroups)
      }
    }, 200);
  }

  componentDidUpdate() {
    const { posts, filterPosts, loading  } = this.props

    if(posts.all.length > 200 && !posts.hasOwnProperty('offers')){
      filterPosts(posts.all)
    }
  }

  render() {
    const { loading } = this.props

    return(
      <MuiThemeProvider muiTheme={getMuiTheme(ChatTheme)}>
        <div>
          <AppBackground imageUrl="http://i.imgur.com/XGIGW7D.jpg"/>
          <LinearProgress mode="indeterminate" className={ loading ? "process-bar" : "hidden" } />
          <SignIn />
          <Navbar />
          <FavouritesList />
          <FeedbackForm />
          <main className="app">
            {this.props.children}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  posts: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  facebookUser: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) =>{
  return {
    posts: state.groupsFeed,
    facebookUser: state.currentUser,
    currentPage: state.currentPage,
    loading: state.loading
  }
}

export default connect(mapStateToProps, { fetchGroupsFeed, filterPosts  })(App)
