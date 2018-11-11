import React, {Component} from "react"
import {connect} from "react-redux"
import L from "../../lang/L"
import {setUserBdate, setUserCycleLength, setUserMenstruationLength} from "../../modules/UserModule"
import "./UserProfile.css"

class UserProfile extends Component {

	select(count, offset, value, onSelect) {
		let items = [];
		for(let i = offset; i < count; i++) {
			items.push(<option key={i} value={i}>{i}</option>)
		}
		return <select className="UserProfile__select" value={value} onChange={e => onSelect(parseInt(e.target.value, 10))}>
			{items}
		</select>
	}

	render() {
		return <div className="UserProfile">
			<div className="UserProfile__header">
				{L.t('profile')}
			</div>
			<div className="UserProfile__panel">
				<div className="UserProfile__basic">
					{L.t('basic_info')}
				</div>
				<div className="UserProfile__line">
					{this.select(31,10, this.props.cycleLength, x => this.props.setUserCycleLength(x))}
					<div className={"left"}>
						{L.t('cycle_length_short')}
					</div>
					<div className={"right"}>
						{L.t('x_day', {count:this.props.cycleLength})}
					</div>
				</div>
				<div className="UserProfile__line">
					{this.select(10,1, this.props.menstruationLength, x => this.props.setUserMenstruationLength(x))}
					<div className={"left"}>
						{L.t('menstruation_length_short')}
					</div>
					<div className={"right"}>
						{L.t('x_day', {count:this.props.menstruationLength})}
					</div>
				</div>
				<div className="UserProfile__line">
					<input type="date"
						   className={"UserProfile__select"}
						   value={this.props.bdate.format("YYYY-MM-DD")}
						   onChange={(e) => this.props.setUserBdate(e.target.value)} />
					<div className={"left"}>
						{L.t('bdate_short')}
					</div>
					<div className={"right"}>
						{this.props.bdate.format("DD.MM.YYYY")}
					</div>
				</div>
			</div>
		</div>
	}
}

UserProfile.propTypes = {
	
}

function map(state) {
	return {
		cycleLength: state.UserModule.cycleLength || 28,
		menstruationLength: state.UserModule.menstruationLength,
		bdate: state.UserModule.bdate,
	}
}

export default connect(map, {setUserCycleLength, setUserBdate, setUserMenstruationLength})(UserProfile)
