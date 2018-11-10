import Backend from "../tools/Backend"
import {devErrorLog} from "../tools/helpers"

const UPDATE = 'Friend.UPDATE'

const initState = {
	list:[],
	loading:false
}

const FriendModule = (state = initState, action) => {
	switch (action.type) {
		case UPDATE:
			return {...state, ...action.update}
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
				dispatch(update({loading:false}))
				console.log(response)
			} )
			.catch( e => {
				devErrorLog(e)
				dispatch(update({loading:false}))
			} )
	}
}

export default FriendModule
