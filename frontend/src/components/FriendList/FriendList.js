import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import "./FriendList.css"

class FriendList extends Component {

	render() {
		return <div className="FriendList">
			FRIEND LIST
		</div>
	}
}

FriendList.propTypes = {
	
}

function map(state) {
	return {

	}
}

export default connect(map, {})(FriendList)
