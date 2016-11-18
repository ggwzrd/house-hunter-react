import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ChatTheme from './styles/base-theme'

// material-ui elements
import LinearProgress from 'material-ui/LinearProgress'

// components
import SignIn from './components/SignIn'
import Navbar from './containers/Navbar'
import FavouritesList from './containers/FavouritesList'

// actions
import appLoading from './actions/loading'

// style
import './App.sass'

class App extends Component {

  progress(completed) {
    if (completed > 100) {
      return 100
    } else {
      const diff = Math.random() * 10;
      setTimeout(() => this.progress(completed + diff), 50)
    }
  }

  render() {
    const { loading } = this.props

    return(
      <MuiThemeProvider muiTheme={getMuiTheme(ChatTheme)}>
        <div>
          <LinearProgress mode="indeterminate" className={ loading ? "process-bar" : "hidden" } />
          <SignIn />
          <Navbar />
          <FavouritesList />
          <main className="app">
            {this.props.children}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  }
}


export default connect(mapStateToProps, { appLoading })(App)
