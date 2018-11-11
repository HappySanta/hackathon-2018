import React, {Component} from "react"
import {connect} from "react-redux"
import "./Footer.css"
import {classNames} from "../../tools/helpers"
import {PANEL_CALENDAR, PANEL_MAIN, PANEL_PROFILE, pushPage} from "../../modules/PageModule"

class Footer extends Component {

	onPushMain = () => {
		this.props.pushPage(PANEL_MAIN)
	}

	onPushCalendar = () => {
		this.props.pushPage(PANEL_CALENDAR)
	}

	onPushProfile = () => {
		this.props.pushPage(PANEL_PROFILE)
	}

	render() {
		const main = classNames({
			"FooterEx__icon": true,
			"FooterEx__icon--main": this.props.main,
			"FooterEx__icon--main-off": !this.props.main,
		})
		const calendar = classNames({
			"FooterEx__icon": true,
			"FooterEx__icon--calendar": this.props.calendar,
			"FooterEx__icon--calendar-off": !this.props.calendar,
		})
		const profile = classNames({
			"FooterEx__icon": true,
			"FooterEx__icon--profile": this.props.profile,
			"FooterEx__icon--profile-off": !this.props.profile,
		})
		return <div className="FooterEx">
			<div onClick={this.onPushMain} className={main}>

			</div>
			<div onClick={this.onPushCalendar} className={calendar}>

			</div>
			<div onClick={this.onPushProfile} className={profile}>

			</div>
		</div>
	}
}

Footer.propTypes = {}

function map(state) {
	return {}
}

export default connect(map, {pushPage})(Footer)
