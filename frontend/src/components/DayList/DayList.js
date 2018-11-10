import React, {Component} from "react"
import {connect} from "react-redux"
import "./DayList.css"
import moment from "moment"
import {classNames} from "../../tools/helpers"
import L from "../../lang/L"

class DayList extends Component {

	onSelectDay(day) {
		if (this.props.onChange && !this.isActiveDay(day)) {
			this.props.onChange(day)
		}
	}

	isActiveDay(day) {
		const now = this.props.selectedDate
		return day.isSame(now, 'day')
	}

	renderDay(day) {
		const className = classNames({
			"DayList__day":true,
			"DayList__day--active": this.isActiveDay(day)
		})

		const weekTag = L.t('week_day_short_'+day.day())
		const dayNumber = day.date()

		return <div onClick={() => this.onSelectDay(day)}
					key={dayNumber}
					className={className}>
			<div className="DayList__week">{weekTag}</div>
			<div className="DayList__number">{dayNumber}</div>
		</div>
	}

	renderDayList() {
		const now = moment()
		return [
			this.renderDay(now.clone().subtract(3,'day')),
			this.renderDay(now.clone().subtract(2,'day')),
			this.renderDay(now.clone().subtract(1,'day')),
			this.renderDay(now.clone()),
			this.renderDay(now.clone().add(1,'day')),
			this.renderDay(now.clone().add(2,'day')),
			this.renderDay(now.clone().add(3,'day')),
		]

	}

	render() {
		return <div className="DayList">
			{this.renderDayList()}
		</div>
	}
}

function map(state) {
	return {
		selectedDate: state.UserModule.selectedDate
	}
}

export default connect(map, {})(DayList)
