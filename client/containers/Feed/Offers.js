// dipendencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import facebookApi from '../../middleware/facebook-api'

// actions
import appLoading from '../../actions/loading'

// material-ui
import Paper from 'material-ui/Paper'
import RefreshIndicator from 'material-ui/RefreshIndicator'

// components
import Title from '../../components/Title'
import Heart from '../../components/Heart'

// styles
import './Offers.scss'

let index = 0

class Offers extends Component {

  componentDidMount(){
    const { offers } = this.props

    console.log('offers mounted')
    index = 0
    !!offers && facebookApi.initialized ? facebookApi.render(offers.slice(index, index + 5)) : null
  }

  componentDidUpdate(){
    const { offers } = this.props

    console.log('offers updated')
    if(!!offers && offers.length > index){
      index += offers.length
      if(facebookApi.initialized){
        setInterval(function () {
          facebookApi.render(offers.slice(index, index + 5))
        }, 500);
      }
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
    const { offers, loading, currentPage } = this.props
    return (
      <div>
        <RefreshIndicator
          size={50}
          left={100}
          top={300}
          style={!loading ? Object.assign({ 'position': 'absolute', 'marginLeft': 'calc(40% - 10px)'}, {'display': 'none'}) : { 'position': 'absolute', 'marginLeft': 'calc(40% - 10px)'} }
          loadingColor="#4080ff"
          status="loading"
        />
        <div className={`offers ${currentPage.name === 'offers' && !loading ? "animation-slide-in-up" : 'hidden' }`}>
          <div className="list-post">
            { !!offers ? offers.slice(index, index + 5).map(this.renderOffers.bind(this)) : null}
          </div>
        </div>
      </div>
    )
  }
}

Offers.propTypes = {
  offers: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  currentPage: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return{
    offers: state.groupsFeed.offers,
    loading: state.loading,
    currentPage: state.currentPage,
  }
}

export default connect(mapStateToProps, { appLoading })(Offers)
