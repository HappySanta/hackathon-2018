import User from "../entities/User"
import SplitDate from "../entities/SplitDate"
import Backend from "../tools/Backend"
import {setFatalError} from "./FatalErrorModule"
import * as connect from "@vkontakte/vkui-connect"

const initState = User.fromRaw({})

const SET_USER = 'UserModule.SET_USER'
const RESET_USER = 'UserModule.RESET_USER'
const INIT_USER = 'UserModule.INIT_USER'

const UserModule = (state = initState, action) => {
	switch (action.type) {
		case SET_USER:
			let user = state.clone()
			action.callback(user)
			return user
		case RESET_USER:
			return initState
		case INIT_USER:
			return action.user
		default:
			return state
	}
}

export function initUser(user) {
	return {type: INIT_USER, user}
}

export function setUser(callback) {
	return {type: SET_USER, callback}
}

export function resetUser() {
	return {type: RESET_USER}
}

export function setUserCycleLength(cycleLength) {
	return setUser(user => user.cycleLength = cycleLength)
}

export function setUserMenstruationLength(menstruationLength) {
	return setUser(user => user.menstruationLength = menstruationLength)
}

export function setUserMenstruatedAt(menstruatedAt) {
	return setUser(user => user.menstruatedAt = SplitDate.fromRaw(menstruatedAt.unix()))
}

export function setUserBdate(bdate) {
	return setUser(user => user.bdate = bdate)
}

export function setUserLoading(loading) {
	return setUser(user => user.loading = loading)
}

export function setUserSelectedDate(selectedDate) {
	return setUser(user => user.selectedDate = selectedDate)
}

export function createUser(onSuccess) {
	return (dispatch, getState) => {
		let user = getState().UserModule
		dispatch(setUserLoading(true))
		Backend.request('v1/user', user.toRaw(), "POST").then(response => {
			connect.send("VKWebAppAllowNotifications", {})
			dispatch(setUserLoading(false))
			dispatch(initUser(User.fromRaw(response)))
			if (onSuccess) {
				onSuccess(response)
			}
		}).catch(e => {
			dispatch(setUserLoading(false))
			setFatalError(e)
		})
	}
}

export default UserModule
