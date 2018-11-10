import React, {Component} from "react"
import {connect} from "react-redux"
import "./Timing.css"
import {FormLayout, Input, FormLayoutGroup, Select} from '@vkontakte/vkui'
import L from "../../lang/L"
import {setUserCycleLength, setUserMenstruationLength} from "../../modules/UserModule"

class Timing extends Component {

	state = {

	}

	render() {
		const {user} = this.props
		return <div className="Timing">
			<FormLayout>
				<FormLayoutGroup top={L.t('cycle_length')}>
					<Input type="number"
						   placeholder={L.t('cycle_length')}
						   onChange={e => setUserCycleLength(e.target.value)}
						   value={user.cycleLength}/>
				</FormLayoutGroup>
				<FormLayoutGroup top={L.t('menstruation_length')}>
					<Input type="number"
						   placeholder={L.t('menstruation_length')}
						   onChange={e => setUserCycleLength(e.target.value)}
						   value={user.cycleLength}/>
				</FormLayoutGroup>
				<FormLayoutGroup top={L.t('menstruated_at')}>
					<Input type="date"/>
				</FormLayoutGroup>
			</FormLayout>
			{user.id}
		</div>
	}
}

function map(state) {
	return {
		user: state.UserModule,
	}
}

export default connect(map, {setUserCycleLength, setUserMenstruationLength})(Timing)
