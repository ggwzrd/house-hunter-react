// dipendencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import LazyLoad from 'react-lazyload'
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
import './Feed.sass'

let index = 0

class Offers extends Component {

  componentWillMount(){
    const { appLoading } = this.props
    appLoading(true)
  }

  componentDidMount(){
    const { offers } = this.props
    console.log('offers mounted')
    let clone = offers
    index = 0
  }

  componentDidUpdate(){
    const { appLoading } = this.props

    if(facebookApi.initialized){
      const renderOffers = setInterval(function () {
        let offersElements = document.getElementsByClassName('fb-post')
        facebookApi.render(offersElements)
        setTimeout(appLoading.bind(null, false), 700)
        clearInterval(renderOffers)
      }, 100)
    }
  }

  renderOffers(offer, index){
    const { loading } = this.props

    return(
      <LazyLoad key={ index } offset={100} height={400} once={true}>
        <div>
          <RefreshIndicator
            size={50}
            left={0}
            top={100}
            status={loading ? "loading"  : "hide" }
            style={{ 'position': 'relative', 'zIndex': '1000'}}
            loadingColor="#4080ff"
          />
          <Paper className="post-container" zDepth={2} >
            <Heart postId={ offer.postId } groupId={ offer.groupId } message={ offer.message }/>
            <div id={offer.postId} className="fb-post"
              data-href={ `https://www.facebook.com/${offer.groupId}/posts/${offer.postId}/` }
              data-width="380">
            </div>
          </Paper>
        </div>
        </LazyLoad>
    )
  }
  render() {
    const { offers } = this.props

    return (
      <div className="feed">
        { !!offers ? offers.map(this.renderOffers.bind(this)) : null}
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
