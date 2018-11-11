import React, {Component} from "react"
import {connect} from "react-redux"
import L from "../../lang/L"
import {setUserBdate, setUserCycleLength, setUserMenstruationLength, updateUser} from "../../modules/UserModule"
import "./UserProfile.css"
import moment from "moment"
import {Button, FixedLayout, Avatar, Checkbox, Cell} from "@vkontakte/vkui"
import BottomPopup from "../BottomPopup/BottomPopup"
import {toggleFriend, togglePopup} from "../../modules/FriendModule"

class UserProfile extends Component {

	toggleFriendsAddPanel() {
		this.props.togglePopup()
	}

	select(count, offset, value, onSelect) {
		let items = [];
		for (let i = offset; i < count; i++) {
			items.push(<option key={i} value={i}>{i}</option>)
		}
		return <select className="UserProfile__select" value={value}
					   onChange={e => onSelect(parseInt(e.target.value, 10))}>
			{items}
		</select>
	}

	setUserCycleLength(x) {
		this.props.setUserCycleLength(x)
		this.props.updateUser()
	}

	setUserMenstruationLength(x) {
		this.props.setUserMenstruationLength(x)
		this.props.updateUser()
	}

	setUserBdate(moment) {
		this.props.setUserBdate(moment)
		this.props.updateUser()
	}

	renderPopupButton() {
		return null
	}

	onBottomPopupClose() {
		this.toggleFriendsAddPanel()
	}

	render() {
		let {selectedFriends, popupOpened, friends, selectedIds} = this.props
		return <div className="UserProfile">
			<div className="UserProfile__header">
				{L.t('profile')}
			</div>
			<div className="UserProfile__panel">
				<div className="UserProfile__basic">
					{L.t('basic_info')}
				</div>
				<div className="UserProfile__line">
					{this.select(31, 10, this.props.cycleLength, x => this.setUserCycleLength(x))}
					<div className={"left"}>
						{L.t('cycle_length_short')}
					</div>
					<div className={"right"}>
						{L.t('x_day', {count: this.props.cycleLength})}
					</div>
				</div>
				<div className="UserProfile__line">
					{this.select(10, 1, this.props.menstruationLength, x => this.setUserMenstruationLength(x))}
					<div className={"left"}>
						{L.t('menstruation_length_short')}
					</div>
					<div className={"right"}>
						{L.t('x_day', {count: this.props.menstruationLength})}
					</div>
				</div>
				<div className="UserProfile__line">
					<input type="date"
						   className={"UserProfile__select"}
						   value={this.props.bdate.format("YYYY-MM-DD")}
						   onChange={(e) => this.setUserBdate(moment(e.target.value))}/>
					<div className={"left"}>
						{L.t('bdate_short')}
					</div>
					<div className={"right"}>
						{this.props.bdate.format("DD.MM.YYYY")}
					</div>
				</div>
			</div>
			{!selectedFriends || !selectedFriends.length ?
				<div className="UserProfile__panel UserProfile__panel--no-access">
					<div className="UserProfile__description">
						{L.t('no_access')}
					</div>
					<div className="UserProfile__center">
						<Button onClick={() => this.toggleFriendsAddPanel()}>
							{L.t('add_friend')}
						</Button>
					</div>
				</div> : null}
			{popupOpened ? <div className="UserProfile__shadow">
			</div> : null}
			{popupOpened ? <FixedLayout vertical='bottom'>
				<div style={{WebkitOverflowScrolling: 'auto', overflow: 'hidden'}}
					 onClick={() => this.onBottomPopupClose()}
					 className="UserProfile__bottom-popup">
					<div className="body" onClick={e => e.stopPropagation()}>
						<BottomPopup footer={this.renderPopupButton()}
									 style={{maxHeight: this.props.h - 64}}
									 mobile={true}
									 title={L.t('users_add')}
									 onClose={() => this.onBottomPopupClose()}>
							<div className="UserProfile__friends-list">
								{friends.map((friend) => {
									return <Checkbox style={{paddingTop: 10}}
													 key={friend.id}
													 checked={selectedIds.indexOf(friend.id) !== -1}
													 onChange={() => this.props.toggleFriend(friend.id)}>
										<div className="UserProfile__friend">
											<Avatar src={friend.photo_200} size={40} style={{marginRight: 12}}/>
											<div>
												{friend.first_name}
											</div>
										</div>
									</Checkbox>
								})}
							</div>
						</BottomPopup>
					</div>
				</div>
			</FixedLayout> : null}
		</div>
	}
}

function map(state) {
	return {
		cycleLength: state.UserModule.cycleLength || 28,
		menstruationLength: state.UserModule.menstruationLength,
		bdate: state.UserModule.bdate,
		friends: state.FriendModule.friends,
		selectedFriends: state.FriendModule.selected_friends,
		selectedIds: state.FriendModule.selected_ids,
		popupOpened: state.FriendModule.popupOpened,
	}
}

export default connect(map, {
	setUserCycleLength,
	setUserBdate,
	setUserMenstruationLength,
	updateUser,
	togglePopup,
	toggleFriend,
})(UserProfile)
