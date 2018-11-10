import React, {Component} from "react"
import {connect} from "react-redux"
import "./Calendar.css"
import {classNames, GetDayOfCycle} from "../../tools/helpers"
import L from "../../lang/L"

class Calendar extends Component {

	onClick = day => {
		if (this.props.onClick) {
			this.props.onClick(day)
		}
	}

	isRedDay(day) {
		const {
			cycleLength,
			menstruatedAt,
			menstruationLength
		} = this.props
		const dayOfCycle = GetDayOfCycle(cycleLength, menstruatedAt.timestampMs(), day)
		return dayOfCycle < menstruationLength
	}

	isFirstRed(day) {
		const {
			cycleLength,
			menstruatedAt,
		} = this.props
		const dayOfCycle = GetDayOfCycle(cycleLength, menstruatedAt.timestampMs(), day)
		return dayOfCycle === 0
	}

	isLastRed(day) {
		const {
			cycleLength,
			menstruatedAt,
			menstruationLength
		} = this.props
		const dayOfCycle = GetDayOfCycle(cycleLength, menstruatedAt.timestampMs(), day)
		return dayOfCycle === menstruationLength-1
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
			"Calendar__day--not-same":!this.isSameMonth(day),
			"Calendar__day--red": this.isRedDay(day),
			"Calendar__day--red-first": this.isFirstRed(day),
			"Calendar__day--red-last": this.isLastRed(day),
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
			<table cellSpacing={0} cellPadding={0} className="Calendar__table">
				<tbody>
				{weeks}
				</tbody>
			</table>
			<div className="Calendar__separator"/>
		</div>
	}
}


function map(state) {
	return {
		cycleLength: state.UserModule.cycleLength || 28,
		menstruatedAt: state.UserModule.menstruatedAt,
		menstruationLength: state.UserModule.menstruationLength,
	}
}

export default connect(map, {})(Calendar)
