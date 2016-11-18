import React, { Component } from 'react'
import { connect } from 'react-redux'


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

import './FavouritesList.sass'

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
  renderFavourite(favourite, index){
    return(
      <div key={index}>
        <ListItem
          leftAvatar={<Avatar src="http://hashmag.gr/wp-content/uploads/2015/10/cb7e7d15ada5d85ad0aea1f7a5ed58b4.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText={ favourite.postId }
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>{ favourite.groupId }</span><br />
              { favourite.message.substr(50) }
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
      </div>
        )
  }
  render(){
    const { favourites } = this.props
    return(
        <Paper className="favourites-container">
          <List>
            <Subheader>Favourites</Subheader>
            { favourites.map(this.renderFavourite) }
          </List>
        </Paper>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    favourites: state.favourites
  }
}

export default connect(mapStateToProps, {})(FavouritesList)
