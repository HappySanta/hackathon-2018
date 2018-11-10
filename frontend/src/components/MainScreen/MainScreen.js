import React, {Component} from "react"
import {connect} from "react-redux"
import "./MainScreen.css"
import {classNames, GetDayOfCycle} from "../../tools/helpers"
import L from "../../lang/L"
import moment from "moment"
import DayList from "../DayList/DayList"
import DayActivity from "../DayActivity/DayActivity"

class MainScreen extends Component {

	render() {
		const {cycleLength,menstruatedAt,menstruationLength} = this.props

		const dayOfCycle = GetDayOfCycle(cycleLength, menstruatedAt.timestampMs())
		const isBadDay = dayOfCycle <= menstruationLength

		return <div className="MainScreen">
			<div className="MainScreen__day-list">
				<DayList/>
			</div>
			<div className="MainScreen__title">{L.t(isBadDay ? "menstruation": "current_cycle")}</div>
			<div className="MainScreen__day">{L.t('x_day', {x:dayOfCycle+1})}</div>
			<div className="MainScreen__advice-list">
				<div className="MainScreen__advice">{L.t("low_chance_to_peer")}</div>
				<div className="MainScreen__advice">{L.t("ovulation_after_x_day", {count:6})}</div>
			</div>
			<DayActivity/>
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

export default connect(map, {})(MainScreen)
