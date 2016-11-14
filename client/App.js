import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ChatTheme from './styles/base-theme'
import './App.sass'

import Navbar from './containers/Navbar'

class App extends Component {
  render() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(ChatTheme)}>
        <div>
          <Navbar />
          <main className="app">
            {this.props.children}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App
