import React, {Component} from "react"
import {connect} from "react-redux"
import "./Timing.css"
import L from "../../lang/L"
import {setUserCycleLength} from "../../modules/UserModule"
import {FixedLayout} from '@vkontakte/vkui'
import {getPathByPanelId, PANEL_MENSTRUATION_LENGTH, pushPage} from "../../modules/PageModule"
import SlideOption from "../SlideOption/SlideOption"

class CycleLength extends Component {

	toMenstruationLength() {
		this.props.pushPage(getPathByPanelId(PANEL_MENSTRUATION_LENGTH))
	}

	render() {
		const {cycleLength} = this.props
		return <div className="Timing">
			<div className="Timing__title">
				{L.t('cycle_length')}
			</div>
			<div className="Timing__center">
				<SlideOption value={cycleLength || 30}
							 onChange={value => this.props.setUserCycleLength(value)}
							 list={[...Array(31).keys()]} offset={10}/>
			</div>
			<FixedLayout vertical="bottom">
				<div className="Timing__bottom-single" onClick={() => this.toMenstruationLength()}>
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
		cycleLength: state.UserModule.getStringCycleLength()
	}
}

export default connect(map, {setUserCycleLength, pushPage})(CycleLength)
