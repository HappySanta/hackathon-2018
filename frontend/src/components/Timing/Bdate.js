import React, {Component} from "react"
import {connect} from "react-redux"
import "./Timing.css"
import L from "../../lang/L"
import {createUser, setUserBdate} from "../../modules/UserModule"
import {FixedLayout} from '@vkontakte/vkui'
import {getPathByPanelId, PANEL_MAIN, popPage, pushPage} from "../../modules/PageModule"
import DatePicker from "../DatePicker/DatePicker"
import WaitDots from "../WaitDots/WaitDots"

class MenstruatedAt extends Component {

	toMain() {
		this.props.createUser(() => {
			this.props.pushPage(getPathByPanelId(PANEL_MAIN))
		})
	}

	back() {
		this.props.popPage()
	}

	render() {
		const {bdate, loading} = this.props
		return <div className="Timing">
			<div className="Timing__title">
				{L.t('bdate')}
			</div>
			<div className="Timing__center">
				<DatePicker date={bdate} onChange={value => this.props.setUserBdate(value)}/>
			</div>
			<FixedLayout vertical="bottom">
				<div className="Timing__bottom-double">
					<div className="Timing__first-button">
						<button className="Btn Timing__button-next" onClick={() => this.toMain()}>
							{!loading ? L.t('next') : <WaitDots blue={true}/>}
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
		bdate: state.UserModule.bdate,
		loading: state.UserModule.loading,
	}
}

export default connect(map, {setUserBdate, pushPage, createUser, popPage})(MenstruatedAt)
