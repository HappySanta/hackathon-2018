import React, {Component} from "react"
import {connect} from "react-redux"
import "./Footer.css"
import {classNames} from "../../tools/helpers"
import {PANEL_CALENDAR, PANEL_MAIN, PANEL_PROFILE, pushPage} from "../../modules/PageModule"

class Footer extends Component {

	lock = false
	stack = null

	setLock() {
		this.lock = true
		setTimeout(() => {
			this.lock = false
			if (this.stack) {
				this.stack()
				this.stack = null
			}
		}, 700)
	}

	setToStck(fn) {
		this.stack = fn
	}

	onPushMain = () => {
		if (this.lock) return this.setToStck( () => this.onPushMain() )
		this.setLock()
		this.props.pushPage(PANEL_MAIN)
		// console.log(PANEL_MAIN)
	}

	onPushCalendar = () => {
		if (this.lock) return this.setToStck( () => this.onPushCalendar() )
		this.setLock()
		this.props.pushPage(PANEL_CALENDAR)
		// console.log(PANEL_CALENDAR)
	}

	onPushProfile = () => {
		if (this.lock) return this.setToStck( () => this.onPushProfile() )
		this.setLock()
		this.props.pushPage(PANEL_PROFILE)
		// console.log(PANEL_PROFILE)
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
