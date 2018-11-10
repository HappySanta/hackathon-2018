import Backend from "../tools/Backend"
import {devErrorLog} from "../tools/helpers"
import {STATUS_WAIT} from "../components/FriendList/FriendList"

const UPDATE = 'Friend.UPDATE'
const MAKE_REQUEST_WAIT = 'Friend.MAKE_REQUEST_WAIT'

const initState = {
	list:[],
	loading:false
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
				dispatch(update({loading:false, list:response}))
			} )
			.catch( e => {
				devErrorLog(e)
				dispatch(update({loading:false}))
			} )
	}
}

export function RequestSubscribe(id) {
	return (dispatch) => {
		dispatch({type:MAKE_REQUEST_WAIT, id})
		Backend.request('v1/friends', {friend_id:id}, "POST")
			.then(response => {
				console.log(response)
			})
			.catch(e => {
				devErrorLog(e)
			})
	}
}

export function ShowFriendData() {

}

export default FriendModule
