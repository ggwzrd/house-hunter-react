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

// styles
import './Offers.scss'

let index = 0

class Offers extends Component {

  componentDidMount(){
    facebookApi.initialized ? facebookApi.render() : null
  }

  componentDidUpdate(){
    const { offers, appLoading } = this.props
    if(offers.length > index){
      facebookApi.render()
      setTimeout(() => { appLoading(false) }, 2000)
      index = offers.length
    }
  }

  renderOffers(offer, index){
    return(
      <Paper key={ index } style={{ width: '500px', 'borderRadius': '4px' }} zDepth={1} >
        <div className="fb-post"
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
