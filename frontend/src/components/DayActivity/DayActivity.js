import React, {Component} from "react"
import {connect} from "react-redux"
import {classNames} from "../../tools/helpers"
import L from "../../lang/L"
import DayState from "../DayState/DayState"
import moment from "moment"
import "./DayActivity.css"
import DayFriends from "../DayFriends/DayFriends"
import DayAdvice from "../DayAdvice/DayAdvice"

const PANEL_ACTIVITY = "activity"
const PANEL_FRIENDS = "friends"
const PANEL_ADVICE = "advice"

class DayActivity extends Component {

	state = {
		activePanel: PANEL_ACTIVITY
	}

	isFeatureDay() {
		return this.props.selectedDate.isAfter(moment())
	}

	getActivePanel() {
		if (this.isFeatureDay()) {
			return PANEL_ADVICE
		} else {
			return this.state.activePanel
		}
	}

	tab(name) {
		const className = classNames({
			"DayActivity__tab": true,
			"DayActivity__tab--active": this.getActivePanel() === name
		})
		return <div onClick={() => this.setState({activePanel:name})}
		className={className}>{L.t("main_tab_" + name)}</div>
	}

	renderContent() {
		if (this.getActivePanel() === PANEL_ACTIVITY) {
			return <DayState isBadDay={this.props.isBadDay}/>
		} else if (this.getActivePanel() === PANEL_FRIENDS) {
			return <DayFriends/>
		} else {
			return <DayAdvice/>
		}
	}

	render() {
		return <div className="DayActivity">
			<div className="DayActivity__tab-list">
				{!this.isFeatureDay() && this.tab(PANEL_ACTIVITY)}
				{!this.isFeatureDay() &&  this.tab(PANEL_FRIENDS)}
				{this.tab(PANEL_ADVICE)}
			</div>
			<div className="DayActivity__content">
				{this.renderContent()}
			</div>
		</div>
	}
}

DayActivity.propTypes = {}

function map(state) {
	return {
		selectedDate: state.UserModule.selectedDate,
	}
}

export default connect(map, {})(DayActivity)
