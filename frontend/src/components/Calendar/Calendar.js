import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import "./Calendar.css"
import {classNames} from "../../tools/helpers"
import L from "../../lang/L"

class Calendar extends Component {


	constructor(props) {
		super(props)

		window.m = this.props.month

		let {month} = this.props
		console.log(
			month.inspect(),
			this.getFirstDayOfFirstWeek().inspect(),
			this.getFirstDayOfFirstWeek().inspect(),
			this.getDayOffset(0).inspect(),
			this.getDayOffset(1).inspect(),
		)
	}

	onClick = day => {
		if (this.props.onClick) {
			this.props.onClick(day)
		}
	}

	isSameMonth(day) {
		let {month} = this.props
		return month.month() === day.month()
	}

	getDayInMonth() {
		let {month} = this.props
		return month.clone().endOf('month').date()
	}

	getWeeksInMonth() {
		let {month} = this.props
		let firstDayOfMonthWeekDay = month.clone().startOf('month').days()
		return Math.ceil((this.getDayInMonth()+firstDayOfMonthWeekDay)/7)
	}

	getFirstDayOfFirstWeek() {
		let {month} = this.props
		let firstDayOfMonthWeekDay = month.clone().startOf('month').days()
		return month.clone().startOf('month').subtract(firstDayOfMonthWeekDay, 'days').add(1, 'day')
	}

	getDayOffset(offset) {
		return this.getFirstDayOfFirstWeek().add(offset, 'days')
	}

	renderDay(offset) {
		const day = this.getDayOffset(offset)
		const name = classNames({
			"Calendar__day":true,
			"Calendar__day--not-same":!this.isSameMonth(day)
		})
		return <td onClick={() => this.onClick(day)}
				   className={name}
				   key={day}>{day.date()}</td>
	}

	renderWeek(weekNumber) {
		return <tr key={weekNumber}>
			{this.renderDay(weekNumber*7+0)}
			{this.renderDay(weekNumber*7+1)}
			{this.renderDay(weekNumber*7+2)}
			{this.renderDay(weekNumber*7+3)}
			{this.renderDay(weekNumber*7+4)}
			{this.renderDay(weekNumber*7+5)}
			{this.renderDay(weekNumber*7+6)}
		</tr>
	}



	render() {
		const weeks = []
		for (let i = 0; i < this.getWeeksInMonth(); i++) {
			weeks.push(this.renderWeek(i))
		}
		const {month} = this.props
		return <div className="Calendar">
			<div className="Calendar__month-name">{L.t("month_"+(month.month()+1))}</div>
			<table className="Calendar__table">
				<tbody>
				{weeks}
				</tbody>
			</table>
		</div>
	}
}

Calendar.propTypes = {
	
}

function map(state) {
	return {

	}
}

export default connect(map, {})(Calendar)
