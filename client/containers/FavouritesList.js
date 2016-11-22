import React, { Component } from 'react'
import { connect } from 'react-redux'

// helper method
import { isVisible } from '../helpers/favourites-helper'

// material-ui
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import './FavouritesList.scss'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
    style={{'zIndex': '300', 'position': 'relative'}}
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
)

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
)

class FavouritesList extends Component{
  componentDidMount(){
    const { currentPage } = this.props
    isVisible(currentPage)
  }

  componentDidUpdate(){
    const { currentPage } = this.props
    isVisible(currentPage)
  }

  renderFavourite(favourite, index){
    return(
        <ListItem
          key={index}
          leftAvatar={<Avatar src="http://hashmag.gr/wp-content/uploads/2015/10/cb7e7d15ada5d85ad0aea1f7a5ed58b4.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText={ favourite.postId }
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>{ favourite.groupId }</span><br />
              { favourite.message.substr(150) }
            </p>
          }
          secondaryTextLines={2}
          className="favourite"
        />
      )
  }
  render(){
    const { favourites } = this.props
    return(
        <Paper className="favourites-container" zDepth={0} >
          <Subheader className="panel-header" >Favourites</Subheader>
          <List className="favourites">
            { favourites.length > 0 ? favourites.map(this.renderFavourite)
              : <ListItem

                leftAvatar={<Avatar src="http://hashmag.gr/wp-content/uploads/2015/10/cb7e7d15ada5d85ad0aea1f7a5ed58b4.jpg" />}
                primaryText={ "Add new favourites here" }
                secondaryText={ "click the heart in the post to start" }
                secondaryTextLines={2}
                className="favourite"
                /> }
          </List>
        </Paper>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    favourites: state.favourites,
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps, {})(FavouritesList)
