import React, {Component} from "react"
import {connect} from "react-redux"
import "./Timing.css"
import L from "../../lang/L"
import {setUserMenstruationLength} from "../../modules/UserModule"
import {FixedLayout} from '@vkontakte/vkui'
import {getPathByPanelId, PANEL_MENSTRUATED_AT, pushPage} from "../../modules/PageModule"
import SlideOption from "../SlideOption/SlideOption"

class MenstruationLength extends Component {

	toMenstruatedAt() {
		this.props.pushPage(getPathByPanelId(PANEL_MENSTRUATED_AT))
	}

	render() {
		const {menstruationLength} = this.props
		return <div className="Timing">
			<div className="Timing__title">
				{L.t('menstruation_length')}
			</div>
			<div className="Timing__center">
				<SlideOption value={menstruationLength}
							 onChange={value => this.props.setUserMenstruationLength(value)}
							 list={[...Array(11).keys()]} offset={1}/>
			</div>
			<FixedLayout vertical="bottom">
				<div className="Timing__bottom-double" onClick={() => this.toMenstruatedAt()}>
					<div>
						<button className="Btn Timing__button-next">
							{L.t('next')}
						</button>
					</div>
					<div>
						<button className="Btn Btn--light">
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
		menstruationLength: state.UserModule.getStringMenstruationLength()
	}
}

export default connect(map, {setUserMenstruationLength, pushPage})(MenstruationLength)
