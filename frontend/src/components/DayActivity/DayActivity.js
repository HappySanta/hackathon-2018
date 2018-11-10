import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import "./DayActivity.css"
import {
	PANEL_BDATE,
	PANEL_CYCLE_LENGTH, PANEL_FRIEND_LIST,
	PANEL_MAIN,
	PANEL_MENSTRUATED_AT,
	PANEL_MENSTRUATION_LENGTH,
	VIEW_MAIN
} from "../../modules/PageModule"
import {Panel, View} from "@vkontakte/vkui"
import MainScreen from "../MainScreen/MainScreen"
import CycleLength from "../Timing/CycleLength"
import MenstruationLength from "../Timing/MenstruationLength"
import MenstruatedAt from "../Timing/MenstruatedAt"
import Bdate from "../Timing/Bdate"
import FriendList from "../FriendList/FriendList"
import {classNames} from "../../tools/helpers"
import L from "../../lang/L"
import DayState from "../DayState/DayState"

const PANEL_ACTIVITY = "activity"
const PANEL_FRIENDS = "friends"
const PANEL_ADVICE = "advice"

class DayActivity extends Component {

	state = {
		activePanel: PANEL_ACTIVITY
	}

	tab(name) {
		const className = classNames({
			"DayActivity__tab": true,
			"DayActivity__tab--active": this.state.activePanel === name
		})
		return <div onClick={() => this.setState({activePanel:name})}
		className={className}>{L.t("main_tab_" + name)}</div>
	}

	renderContent() {
		if (this.state.activePanel === PANEL_ACTIVITY) {
			return <DayState/>
		}
	}

	render() {
		return <div className="DayActivity">
			<div className="DayActivity__tab-list">
				{this.tab(PANEL_ACTIVITY)}
				{this.tab(PANEL_FRIENDS)}
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
	return {}
}

export default connect(map, {})(DayActivity)
