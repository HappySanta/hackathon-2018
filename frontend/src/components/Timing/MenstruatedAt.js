import React, {Component} from "react"
import {connect} from "react-redux"
import "./Timing.css"
import L from "../../lang/L"
import {setUserMenstruatedAt} from "../../modules/UserModule"
import {FixedLayout} from '@vkontakte/vkui'
import {getPathByPanelId, PANEL_BDATE, pushPage} from "../../modules/PageModule"
import DatePicker from "../DatePicker/DatePicker"

class MenstruatedAt extends Component {

	toBdate() {
		this.props.pushPage(getPathByPanelId(PANEL_BDATE))
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
				<div className="Timing__bottom-single" onClick={() => this.toBdate()}>
					<button className="Btn">
						{L.t('next')}
					</button>
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

export default connect(map, {setUserMenstruatedAt, pushPage})(MenstruatedAt)
