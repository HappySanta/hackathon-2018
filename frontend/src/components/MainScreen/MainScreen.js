import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import "./MainScreen.css"
import {GetDayOfCycle} from "../../tools/helpers"
import L from "../../lang/L"

class MainScreen extends Component {

	render() {
		const {cycleLength,menstruatedAt,menstruationLength} = this.props
		// console.log([cycleLength, menstruatedAt, menstruationLength])

		const dayOfCycle = GetDayOfCycle(cycleLength, menstruatedAt.timestampMs())
		const isBadDay = dayOfCycle <= menstruationLength

		return <div className="MainScreen">
			<div className="MainScreen__days">

			</div>
			<div className="MainScreen__title">{L.t(isBadDay ? "menstruation": "current_cycle")}</div>
			<div className="MainScreen__day">{L.t('x_day', {x:dayOfCycle+1})}</div>
		</div>
	}
}

MainScreen.propTypes = {
	
}

function map(state) {
	return {
		cycleLength: state.UserModule.cycleLength || 28,
		menstruatedAt: state.UserModule.menstruatedAt,
		menstruationLength: state.UserModule.menstruationLength,
	}
}

export default connect(map, {})(MainScreen)
