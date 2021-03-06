import React, {Component} from "react"
import {connect} from "react-redux"
import "./MainScreen.css"
import {GetDayOfCycle} from "../../tools/helpers"
import L from "../../lang/L"
import DayList from "../DayList/DayList"
import DayActivity from "../DayActivity/DayActivity"
import {setUserSelectedDate} from "../../modules/UserModule"
import {changeDay} from "../../modules/DailyStateModule"

class MainScreen extends Component {

	getSecondAdvice(dayOfCycle, menstruationLength, cycleLength) {
		if (dayOfCycle < menstruationLength) {
			return L.t("ovulation_after_x_day", {count:menstruationLength-dayOfCycle})
		} else {
			return L.t("m_after_x_day", {count:cycleLength-dayOfCycle})
		}
	}

	getFirstAdvice(dayOfCycle, menstruationLength, cycleLength) {
		if (dayOfCycle < menstruationLength) {
			return L.t('low_chance_to_peer')
		} else {
			return L.t('hight_chance_to_peer')
		}
	}

	onDayChange(dateMoment) {
		this.props.setUserSelectedDate(dateMoment)
		this.props.changeDay(dateMoment)
	}

	render() {
		const {cycleLength, menstruatedAt, menstruationLength, selectedDate} = this.props

		const dayOfCycle = GetDayOfCycle(cycleLength, menstruatedAt.timestampMs(), selectedDate)
		const isBadDay = dayOfCycle <= menstruationLength

		let classList = ["MainScreen"]
		if (!isBadDay) {
			classList.push("MainScreen--green")
		}
		return <div className={classList.join(' ')}>
			<div className="MainScreen__day-list">
				<DayList onChange={dateMoment => this.onDayChange(dateMoment)}/>
			</div>
			<div className="MainScreen__title">{L.t(isBadDay ? "menstruation": "current_cycle")}</div>
			<div className="MainScreen__day">{L.t('x_day', {x:dayOfCycle+1})}</div>
			<div className="MainScreen__advice-list">
				<div className="MainScreen__advice-wrapper">
					<div className="MainScreen__advice">{this.getFirstAdvice(dayOfCycle, menstruationLength, cycleLength)}</div>
				</div>
				<div className="MainScreen__advice">{this.getSecondAdvice(dayOfCycle, menstruationLength, cycleLength)}</div>
			</div>
			<DayActivity isBadDay={isBadDay}/>
		</div>
	}
}

function map(state) {
	return {
		cycleLength: state.UserModule.cycleLength || 28,
		menstruationLength: state.UserModule.menstruationLength,
		menstruatedAt: state.UserModule.menstruatedAt,
		selectedDate: state.UserModule.selectedDate,
	}
}

export default connect(map, {setUserSelectedDate, changeDay})(MainScreen)
