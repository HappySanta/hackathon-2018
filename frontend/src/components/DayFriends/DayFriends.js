import React, {Component} from "react"
import {connect} from "react-redux"
import "./DayFriends.css"
import FriendItem from "../FriendItem/FriendItem"

class DayFriends extends Component {

	render() {
		return <div className="DayFriends">
			<FriendItem/>
		</div>
	}
}

DayFriends.propTypes = {
	
}

function map(state) {
	return {

	}
}

export default connect(map, {})(DayFriends)
