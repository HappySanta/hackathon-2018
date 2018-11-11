import Backend from "../tools/Backend"
import {devErrorLog} from "../tools/helpers"
import {STATUS_WAIT} from "../components/FriendList/FriendList"

const UPDATE = 'Friend.UPDATE'
const MAKE_REQUEST_WAIT = 'Friend.MAKE_REQUEST_WAIT'
const TOGGLE_FRIEND = 'Friend.TOGGLE_FRIEND'

const initState = {
	friends:[],
	selected_ids: [],
	selected_friends: [],
	loading:false,
	popupOpened: false,
}

const FriendModule = (state = initState, action) => {
	switch (action.type) {
		case UPDATE:
			return {...state, ...action.update}
		case MAKE_REQUEST_WAIT:
			return {...state, list: state.list.map( user => {
				if (user.id === action.id) {
					return {...user, status: STATUS_WAIT}
				}
				return user
				} )}
		case TOGGLE_FRIEND:
			if (state.selected_ids.indexOf(action.id) !== -1) {
				return {
					...state,
					selected_ids:state.selected_ids.filter( x => x!==action.id ),
					selected_friends: state.selected_friends.filter( u => u.id !== action.id )
				}
			} else {
				return {...state,
					selected_ids:state.selected_ids.concat([action.id]),
					selected_friends: state.selected_friends.concat( state.friends.filter(u => u.id === action.id) )
				}
			}
		default:
			return state
	}
}

function update(update) {
	return {type: UPDATE, update}
}

export function togglePopup() {
	return (dispatch, getState) => {
		let {popupOpened} = getState().FriendModule
		dispatch(update({popupOpened: !popupOpened}))
	}
}

export function LoadFriends() {
	return (dispatch) => {
		dispatch(update({loading:true}))
		Backend.request('v1/friends', {}, 'GET')
			.then( response => {
				dispatch(update({loading:false,
					friends:response.friends,
					selected_ids: response.selected_id,
					selected_friends: response.friends.filter( user => response.selected_id.indexOf(user.id) !== -1 ),
				}))
			} )
			.catch( e => {
				devErrorLog(e)
				dispatch(update({loading:false}))
			} )
	}
}

export function toggleFriend(id) {
	return dispatch => {
		dispatch({type: TOGGLE_FRIEND, id})
	}
}

export default FriendModule
