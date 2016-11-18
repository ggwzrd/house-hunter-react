// dipendencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import facebookApi from '../../middleware/facebook-api'

// actions
import appLoading from '../../actions/loading'

// material-ui
import Paper from 'material-ui/Paper'

// components
import Title from '../../components/Title'
import Heart from '../../components/Heart'

// styles
import './Offers.scss'

let index = 0

class Offers extends Component {

  componentDidMount(){
    const { offers } = this.props
    index = 0
    facebookApi.initialized ? facebookApi.render(offers) : null
  }

  componentDidUpdate(){
    const { offers } = this.props
    if(offers.length > index){
      console.log(facebookApi.initialized)
      // facebookApi.initialized ? facebookApi.render(offers) : null
      index = offers.length
    }
  }

  renderOffers(offer, index){
    return(
      <Paper key={ index } style={{ width: '500px', 'borderRadius': '4px' }} zDepth={1} >
        <Heart postId={ offer.postId } groupId={ offer.groupId } message={ offer.message }/>
        <div id={offer.postId} className="fb-post"
          data-href={ `https://www.facebook.com/${offer.groupId}/posts/${offer.postId}/` }
          data-width="500">
        </div>
      </Paper>
    )
  }
  render() {
    const { offers, className } = this.props
    return (
      <div className={ className }>
        <div className="list-post">
          { offers.map(this.renderOffers.bind(this)) }
        </div>
      </div>
    )
  }
}

Offers.propTypes = {
  offers: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
}

export default connect(null, { appLoading })(Offers)
