import React, {Component} from "react"
import {connect} from "react-redux"
import "./Timing.css"
import L from "../../lang/L"
import {setUserMenstruatedAt} from "../../modules/UserModule"
import {FixedLayout} from '@vkontakte/vkui'
import {getPathByPanelId, PANEL_BDATE, popPage, pushPage} from "../../modules/PageModule"
import DatePicker from "../DatePicker/DatePicker"

class MenstruatedAt extends Component {

	toBdate() {
		this.props.pushPage(getPathByPanelId(PANEL_BDATE))
	}

	back() {
		this.props.popPage()
	}

	render() {
		const {menstruatedAt} = this.props
		return <div className="Timing">
			<div className="Timing__title">
				{L.t('menstruated_at')}
			</div>
			<div className="Timing__center">
				<DatePicker date={menstruatedAt} onChange={value => this.props.setUserMenstruatedAt(value)}/>
			</div>
			<FixedLayout vertical="bottom">
				<div className="Timing__bottom-double">
					<div className="Timing__first-button">
						<button className="Btn Timing__button-next" onClick={() => this.toBdate()}>
							{L.t('next')}
						</button>
					</div>
					<div>
						<button className="Btn Btn--light" onClick={() => this.back()}>
							{L.t('back')}
						</button>
					</div>
				</div>
			</FixedLayout>
		</div>
	}
}

function map(state) {
	return {
		menstruatedAt: state.UserModule.menstruatedAt
	}
}

export default connect(map, {setUserMenstruatedAt, pushPage, popPage})(MenstruatedAt)
