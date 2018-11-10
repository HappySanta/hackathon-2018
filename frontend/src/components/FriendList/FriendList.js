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


	renderStatus(status) {
		if (status === STATUS_NONE) {
			return "";
		}
		return L.t('status_' + status)
	}


	renderStatusButton(status, id) {
		if (status === STATUS_NONE) {
			return <Button onClick={ () => this.props.RequestSubscribe(id) }>{L.t('request_data')}</Button>
		}
		if (status === STATUS_OK) {
			return <Button>{L.t('show_data')}</Button>
		}
	}

	renderUser = (user) => {
		return <Cell
			key={user.id}
			size="l"
			description={this.renderStatus(user.status)}
			before={<Avatar src={user.photo_200}/>}
			bottomContent={this.renderStatusButton(user.status, user.id)}
		>
			{user.first_name} {user.last_name}
		</Cell>
	}

	render() {
		const {list} = this.props
		return <div className="FriendList">
			<Group title={L.t('friend_list')}>
				{list.map( user => this.renderUser(user))}
			</Group>
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

export default connect(map, {RequestSubscribe})(FriendList)
