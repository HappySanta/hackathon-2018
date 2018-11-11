import React, {Component} from "react"
import {connect} from "react-redux"
import "./CalendarScreen.css"
import Calendar from "../Calendar/Calendar"
import moment from "moment"
import L from "../../lang/L"
import {GetDayOfCycle} from "../../tools/helpers"

class CalendarScreen extends Component {

	render() {
		const {cycleLength, menstruatedAt, menstruationLength, selectedDate} = this.props

		const dayOfCycle = GetDayOfCycle(cycleLength, menstruatedAt.timestampMs(), selectedDate)
		const isBadDay = dayOfCycle <= menstruationLength

		let classList = ["CalendarScreen"]
		if (!isBadDay) {
			classList.push("CalendarScreen--green")
		}
		return <div className={classList.join(' ')}>
			<div className="CalendarScreen__week-day-list">
				<div className="CalendarScreen__week-day">{L.t('week_day_short_1')}</div>
				<div className="CalendarScreen__week-day">{L.t('week_day_short_2')}</div>
				<div className="CalendarScreen__week-day">{L.t('week_day_short_3')}</div>
				<div className="CalendarScreen__week-day">{L.t('week_day_short_4')}</div>
				<div className="CalendarScreen__week-day">{L.t('week_day_short_5')}</div>
				<div className="CalendarScreen__week-day">{L.t('week_day_short_6')}</div>
				<div className="CalendarScreen__week-day">{L.t('week_day_short_0')}</div>
			</div>
			<Calendar month={moment()}/>
			<Calendar month={moment().add(1, 'month')}/>
			<Calendar month={moment().add(2, 'month')}/>
		</div>
	}
}

function map(state) {
	return {
		cycleLength: state.UserModule.cycleLength || 28,
		menstruatedAt: state.UserModule.menstruatedAt,
		menstruationLength: state.UserModule.menstruationLength,
		selectedDate: state.UserModule.selectedDate,
	}
}

export default connect(map, {})(CalendarScreen)
