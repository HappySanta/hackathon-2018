import React, {Component} from "react"
import {connect} from "react-redux"
import {nToBr} from "../../tools/helpers"
import "./DayAdvice.css"

class DayAdvice extends Component {

	getAdviceList() {

		return [
			{
				title: "Hello world",
				text: "Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
			},
			{
				title: "Hello world",
				text: "Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
			}
		]

	}

	renderAdvice = (advice, index) => {
		return <div key={index} className="DayAdvice__item">
			<div className="DayAdvice__title">{advice.title}</div>
			<div className="DayAdvice__text">{nToBr(advice.text)}</div>
		</div>
	}

	render() {
		return <div className="DayAdvice">
			{this.getAdviceList().map(this.renderAdvice)}
		</div>
	}
}

DayAdvice.propTypes = {
	
}

function map(state) {
	return {

	}
}

export default connect(map, {})(DayAdvice)
