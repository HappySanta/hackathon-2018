import React, {Component} from "react"
import {connect} from "react-redux"
import "./Footer.css"
import {classNames} from "../../tools/helpers"
import {PANEL_CALENDAR, PANEL_MAIN, pushPage} from "../../modules/PageModule"

class Footer extends Component {

	onPushMain = () => {
		this.props.pushPage(PANEL_MAIN)
	}

	onPushCalendar = () => {
		this.props.pushPage(PANEL_CALENDAR)
	}

	render() {
		const main = classNames({
			"FooterEx__icon": true,
			"FooterEx__icon--main": this.props.main,
			"FooterEx__icon--main-off": !this.props.main,
		})
		const calendar = classNames({
			"FooterEx__icon": true,
			"FooterEx__icon--calendar": !this.props.main,
			"FooterEx__icon--calendar-off": this.props.main,
		})
		return <div className="FooterEx">
			<div onClick={this.onPushMain} className={main}>

			</div>
			<div onClick={this.onPushCalendar} className={calendar}>

			</div>
		</div>
	}
}

function map(state) {
	return {

	}
}

export default connect(map, {pushPage})(Footer)
