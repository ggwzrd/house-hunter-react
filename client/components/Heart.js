import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// actions
import createFavourite from '../actions/create-favourite'

// material-ui
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import './Heart.sass'

class Heart extends Component {

  addToFavourite(){
    const { createFavourite, postId, groupId, userId, message } = this.props
    createFavourite({ postId: postId, groupId: groupId, message: message, userId: userId })
  }

  render() {

    return (
      <RadioButtonGroup className="heart" name="favourite" onChange={ this.addToFavourite.bind(this) } >
        <RadioButton
          value="favourite"
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
        />
      </RadioButtonGroup>
    )
  }
}

Heart.propTypes = {
  postId: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  message: PropTypes.string,
}

const mapStateToProps = (state) =>{
  return {
    userId: state.currentUser._id
  }
}

export default connect(null, { createFavourite })(Heart)
