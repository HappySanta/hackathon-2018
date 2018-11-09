import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeFatalError} from "../../modules/FatalErrorModule"
import L from "../../lang/L"
import {
	getRouteByPath, PANEL_MAIN, popPage, VIEW_MAIN,
} from "../../modules/PageModule"
import {withRouter} from "react-router"
import Error from "../../components/Error/Error"
import Icon24Back from '@vkontakte/icons/dist/24/back'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import {Root, View, Panel, PanelHeader, HeaderButton, platform, IOS} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import Calendar from "../../components/Calendar/Calendar"
import moment from "moment"

const osName = platform()

class MobileContainer extends Component {

	static deviceWidth = 0
	static deviceHeight = 0

	constructor(props) {
		super(props)

		if (MobileContainer.deviceWidth === 0) {
			MobileContainer.deviceWidth = window.innerWidth
		}

		if (MobileContainer.deviceHeight === 0 && window.innerHeight) {
			MobileContainer.deviceHeight = window.innerHeight - this.getPanelHeight()
		}

		if (MobileContainer.deviceWidth < 10) {
			this.recheckDimensions()
		}

		if ('onorientationchange' in window) {
			window.addEventListener("orientationchange", () => {
				MobileContainer.deviceHeight = window.innerWidth - this.getPanelHeight()
				MobileContainer.deviceWidth = window.innerHeight
				this.setState({time: Date.now()})
			}, false)
		}
	}

	getPanelHeight() {
		return osName === IOS ? 44 : 56
	}

	getAndroidVersion() {
		let ua = (window.navigator.userAgent).toLowerCase()
		// eslint-disable-next-line
		let match = ua.match(/android\s([0-9\.]*)/)
		if (ua.indexOf('chrome/6') !== -1) {
			return false
		}
		return match ? parseInt(match[1], 10) : false
	}

	getIosVersion() {
		if (/iP(hone|od|ad)/.test(navigator.platform)) {
			let v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
			return parseInt(v[1], 10)
		} else {
			return false
		}
	}

	recheckDimensions() {
		if (MobileContainer.deviceWidth < 10) {
			setTimeout(() => {
				try {
					MobileContainer.deviceHeight = window.innerHeight - this.getPanelHeight()
					MobileContainer.deviceWidth = document.documentElement.offsetWidth
				} catch (e) {
					MobileContainer.deviceWidth = window.innerWidth
				}
				this.setState({time: Date.now()})
				this.recheckDimensions()
			}, 100)
		}
	}

	renderBackPanelHeader(title, noShadow = false) {
		return <PanelHeader
			noShadow={noShadow}
			left={<HeaderButton onClick={() => this.props.popPage()}>
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}>
			{title}
		</PanelHeader>
	}

	render() {
		if (this.props.fatal) {
			return <Error error={this.props.fatal} onClose={() => this.props.removeFatalError()}/>
		}
		if ((this.getAndroidVersion() && this.getAndroidVersion() <= 4) || (this.getIosVersion() && this.getIosVersion() <= 8)) {
			return <div className="not-supported" style={{
				width: MobileContainer.deviceWidth,
				height: MobileContainer.deviceHeight,
			}}>
				<div className="plak-wrapper">
					<div className="plak">
					</div>
					<div className="plak-text">
						{L.t('not_supported')}
					</div>
				</div>
			</div>
		}
		let route = getRouteByPath(this.props.location.pathname)
		return <Root activeView={route.getView()}>
			<View id={VIEW_MAIN} activePanel={route.panelName}>
				<Panel id={PANEL_MAIN}>
					<PanelHeader>My App</PanelHeader>
					<Calendar month={moment()}/>
					<Calendar month={moment().add(1, 'month')}/>
				</Panel>
			</View>
		</Root>
	}
}

function mapStateToProps(state) {
	return {
		fatal: state.FatalErrorModule,
	}
}

export default withRouter(connect(mapStateToProps, {
	removeFatalError,
	popPage,
})(MobileContainer))
