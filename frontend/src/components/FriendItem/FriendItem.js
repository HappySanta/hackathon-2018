import React, {Component} from "react"
import {connect} from "react-redux"
import "./FriendItem.css"
import {GetDayOfCycle} from "../../tools/helpers"
import L from "../../lang/L"

class FriendItem extends Component {

	render() {
		const {
			menstruation_length,
			cycle_length,
			menstruated_at,
		}  = this.props
		const dayOfCycle = GetDayOfCycle(cycle_length, menstruated_at*1000, this.props.day)
		const isBadDay = dayOfCycle <= menstruation_length
		return <div className="FriendItem">
			<div className="FriendItem__header">
				<div style={{backgroundImage:`url(${this.props.photo_200})`}} className="FriendItem__photo"/>
				<div className="FriendItem__name-box">
					<div className="FriendItem__name">{this.props.first_name} {this.props.last_name}</div>
					<div className="FriendItem__description">{L.t(isBadDay ? 'x_day_of_red' : "x_day_of_cycle", {count:dayOfCycle+1})}</div>
				</div>
			</div>
			<div className="FriendItem__content">
				<div className="FriendItem__text">
					{this.props.comment}
				</div>
				<div className="FriendItem__tags">
					{this.props.state.map( (tag,index) => <div key={index} className="FriendItem__tag">{tag}</div> )}
				</div>
			</div>
		</div>
	}
}

FriendItem.propTypes = {
	
}

function map(state) {
	return {

	}
}

export default connect(map, {})(FriendItem)
