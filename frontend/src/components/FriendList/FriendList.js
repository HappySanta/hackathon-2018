import React, {Component} from "react"
import {connect} from "react-redux"
import {Group, Cell, Avatar, Button} from '@vkontakte/vkui'
import "./FriendList.css"
import {RequestSubscribe} from "../../modules/FriendModule"
import L from "../../lang/L"

const STATUS_NONE = -1
export const STATUS_WAIT = 0
const STATUS_OK = 1

class FriendList extends Component {




	render() {
		const {list} = this.props
		return <div className="FriendList">

		</div>
	}
}

FriendList.propTypes = {
	
}

function map(state) {
	return {
		list: state.FriendModule.list
	}
}

export default connect(map, {})(FriendList)
