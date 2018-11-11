import React, {Component} from "react"
import {connect} from "react-redux"
import "./DayFriends.css"
import FriendItem from "../FriendItem/FriendItem"
import moment from "moment"

class DayFriends extends Component {

	render() {
		return <div className="DayFriends">
			{this.props.list.map(user => <FriendItem {...user}
													 day={this.props.day}
													 key={user.id}/>)}

		</div>
	}
}

DayFriends.propTypes = {}

function map(state) {
	const day = state.UserModule.selectedDate
	const feed = state.FriendModule.feed
	let fake = [
		{
			cycle_length: 28,
			menstruation_length: 7,
			menstruated_at: moment('2018-11-01').unix(),
			first_name: "Гаечка",
			last_name: "",
			photo_200: require('../FriendItem/g.png'),
			state: ['Путешествие', 'Спокойная'],
			comment: "",
			id: -900
		}
	]
	return {
		list: (feed && feed[day.date()]) ? feed[day.date()] : fake,
		day: day,
	}
}

export default connect(map, {})(DayFriends)
