import React, {Component} from "react"
import {connect} from "react-redux"
import {nToBr} from "../../tools/helpers"
import "./DayAdvice.css"

class DayAdvice extends Component {

	getAdviceList() {

		return [
			{
				title: "Настроение",
				text: "Настроение улучшается, наступает просветление в мыслях – это хорошее время для составления планов, принятия взвешенных решений."
			},
			{
				title: "Приветствую!",
				text: "Этот путеводитель объясняет, какие процессы происходят в организме женщины на протяжении менструального цикла. Описывает, как они влияют на физическое самочувствие и настроение. Подсказывает, как подстроить свои дела, досуг, спорт, секс, диету под индивидуальные особенности. Цель путеводителя – помочь каждой женщине и девушке лучше понять себя, а значит, сделать каждую из нас сильнее, увереннее в себе, счастливее."
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
