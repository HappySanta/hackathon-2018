import React, {Component} from "react"
import {connect} from "react-redux"
import "./Timing.css"
import L from "../../lang/L"
import {setUserBdate} from "../../modules/UserModule"
import {FixedLayout} from '@vkontakte/vkui'
import {getPathByPanelId, PANEL_MAIN, pushPage} from "../../modules/PageModule"
import DatePicker from "../DatePicker/DatePicker"

class MenstruatedAt extends Component {

	toMain() {
		this.props.pushPage(getPathByPanelId(PANEL_MAIN))
	}

	render() {
		const {bdate} = this.props
		return <div className="Timing">
			<div className="Timing__title">
				{L.t('bdate')}
			</div>
			<div className="Timing__center">
				<DatePicker date={bdate} onChange={value => this.props.setUserBdate(value)}/>
			</div>
			<FixedLayout vertical="bottom">
				<div className="Timing__bottom-single" onClick={() => this.toMain()}>
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
		bdate: state.UserModule.bdate
	}
}

export default connect(map, {setUserBdate, pushPage})(MenstruatedAt)
