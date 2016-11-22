import React, { Component, PropTypes } from 'react'

// helpers
import { nextQuestion, prevQuestion, setStars, saveFeedback } from '../../helpers/feedback-helper'
// styles
import './FeedbackForm.scss'

class FeedbackForm extends Component{

  componentWillMount(){
    this.setState({
      showFeedback: false,
      stars: [{id:1, label: 'Not at all'},{id:2, label: ''},{id:3, label: 'Almost'},{id:4, label: ''},{id:5, label: 'Yeeees!'}],
      scroll: 0,
    }, null)
  }

  onRating(index){
    let { stars } = this.state
    this.setState({stars: setStars(stars, index)}, null)
  }

  prev(){
    let { scroll } = this.state
    this.setState({scroll: prevQuestion(scroll)}, null)
  }

  next(){
    let { scroll } = this.state
    this.setState({scroll: nextQuestion(scroll)}, null)
  }

  save(){
    saveFeedback()
  }

  renderStars(star, index){
    return(
      <div key={ index } className={`rating ${star.checked ? 'checked' : "" }`} >
        <input type="checkbox" value="{{star.id}}" />
        <span onClick = { this.onRating.bind(this, index) } className="star" name = "{{star.id}}"></span>
        <p>{ star.label }</p>
      </div>
    )
  }

  render(){
    const { showFeedback, stars } = this.state

    return(
      <div className = {`right-btn-container ${ showFeedback ? 'show' : "" }` }>
        <input type="button" className ="feedback-btn" onClick = { this.setState.bind(this, {showFeedback: !this.state.showFeedback}, null) } />
        <div className ={ `feedback ${ showFeedback ? 'show' : "" }` }>
          <div className="close" onClick = { this.setState.bind(this, {showFeedback: !this.state.showFeedback}, null)  } ><h3>X</h3></div>
          <div className="col-2 controllers">
            <div className = "prev" onClick = { this.prev.bind(this) } ><p>	&#60; Prev</p></div>
            <div className = "save" ><p>Send</p></div>
            <div className = "next" onClick = { this.next.bind(this) } ><p>Next &#62;</p></div>
          </div>
          <div id="one" className ="col-12 question visible">
            <div className = "col-12 title">Was this helpful to you?</div>
            <div className="col-6 ratings">
              { stars.map(this.renderStars.bind(this)) }
            </div>
          </div>
          <div id="two" className ="col-12 question">
            <div className = "col-12 title">Suggestions:</div>
            <textarea maxLength="120" placeholder="< Add Text Here >" draggable="false"></textarea>
          </div>
        </div>
      </div>
    )
  }
}


export default FeedbackForm
