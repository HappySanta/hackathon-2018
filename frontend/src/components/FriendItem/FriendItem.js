import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import "./FriendItem.css"

class FriendItem extends Component {

	render() {
		return <div className="FriendItem">
			<div className="FriendItem__header">
				<div className="FriendItem__photo"/>
				<div className="FriendItem__name-box">
					<div className="FriendItem__name">Гаечка</div>
					<div className="FriendItem__description">13 день цикла</div>
				</div>
			</div>
			<div className="FriendItem__content">
				<div className="FriendItem__text">

				</div>
				<div className="FriendItem__tags">
					<div className="FriendItem__tag">Путешествие</div>
					<div className="FriendItem__tag">Спокойная</div>
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
