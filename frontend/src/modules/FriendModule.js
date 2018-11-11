import Backend from "../tools/Backend"
import {devErrorLog} from "../tools/helpers"
import {STATUS_WAIT} from "../components/FriendList/FriendList"

const UPDATE = 'Friend.UPDATE'
const MAKE_REQUEST_WAIT = 'Friend.MAKE_REQUEST_WAIT'
const TOGGLE_FRIEND = 'Friend.TOGGLE_FRIEND'
const COMMIT_FRIENS = 'Friend.COMMIT_FRIENS'
const ROLLBACK_FRIENS = 'Friend.ROLLBACK_FRIENS'

const initState = {
	friends:[],
	selected_ids: [],
	selected_friends: [],
	selected_friends_original:[],
	feed: [],
	loading:false
}

const FriendModule = (state = initState, action) => {
	switch (action.type) {
		case ROLLBACK_FRIENS:
			return {...state,
				selected_ids: state.selected_friends_original.map(x => x.id),
				selected_friends: state.selected_friends_original.concat([])
			}
		case COMMIT_FRIENS:
			return {...state,
				selected_friends_original: state.selected_friends.concat([])
			}
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

export function LoadFriends() {
	return (dispatch) => {
		dispatch(update({loading:true}))
		Backend.request('v1/friends', {}, 'GET')
			.then( response => {
				let selectedFroends = response.friends.filter( user => response.selected_id.indexOf(user.id) !== -1 )
				dispatch(update({loading:false,
					friends:response.friends.slice(0, 100),
					selected_ids: response.selected_id,
					selected_friends: selectedFroends,
					selected_friends_original: selectedFroends,
					feed: response.feed
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
		dispatch(saveFriends())
	}
}

export function saveFriends() {
	return (dispatch, getState) => {
		const {selected_ids} = getState().FriendModule
		dispatch({type: COMMIT_FRIENS})
		Backend.request('v1/friends', {friend_ids:selected_ids}, "POST")
			.then(response => {

			})
			.catch(e => {
				devErrorLog(e)
			})
	}
}

export function rollbackFriends() {
	return {type: ROLLBACK_FRIENS}
}

export default FriendModule
