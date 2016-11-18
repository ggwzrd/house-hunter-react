// dipendencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import facebookApi from '../../middleware/facebook-api'

// actions
import appLoading from '../../actions/loading'

// material-ui
import Paper from 'material-ui/Paper'
import RefreshIndicator from 'material-ui/RefreshIndicator'

// components
import Title from '../../components/Title'
import Heart from '../../components/Heart'
import LazyLoad from 'react-lazyload'

// styles
import './Offers.scss'

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
    const { offers, appLoading } = this.props

    console.log('offers updated')
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
    return(
      <LazyLoad key={ index } height={400} >
        <Paper style={{ width: '500px', 'borderRadius': '4px', 'minHeight': '200px' }} zDepth={1} >
          <Heart postId={ offer.postId } groupId={ offer.groupId } message={ offer.message }/>
          <div id={offer.postId} className="fb-post"
            data-href={ `https://www.facebook.com/${offer.groupId}/posts/${offer.postId}/` }
            data-width="500">
          </div>
        </Paper>
      </LazyLoad>
    )
  }
  render() {
    const { offers, loading, currentPage } = this.props

    return (
      <div className="list">
        { !!offers ? offers.map(this.renderOffers.bind(this)) : null}
        <RefreshIndicator
          size={50}
          left={100}
          top={300}
          style={!loading ? Object.assign({ 'position': 'relative', 'marginLeft': 'calc(40% - 10px)'}, {'display': 'none'}) : { 'position': 'relative', 'marginLeft': 'calc(40% - 10px)'} }
          loadingColor="#4080ff"
          status="loading"
        />

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
