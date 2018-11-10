import DailyState from "../entities/DailyState"
import Backend from "../tools/Backend"
import {setFatalError} from "./FatalErrorModule"

const initState = DailyState.fromRaw({})

const SET_DAILY_STATE = 'DailyStateModule.SET_DAILY_STATE'
const RESET_DAILY_STATE = 'DailyStateModule.RESET_DAILY_STATE'
const INIT_DAILY_STATE = 'DailyStateModule.INIT_DAILY_STATE'

const DailyStateModule = (state = initState, action) => {
	switch (action.type) {
		case SET_DAILY_STATE:
			let dailyState = state.clone()
			action.callback(dailyState)
			return dailyState
		case RESET_DAILY_STATE:
			return initState
		case INIT_DAILY_STATE:
			return action.dailyState
		default:
			return state
	}
}

export function initDailyState(dailyState) {
	return {type: INIT_DAILY_STATE, dailyState}
}

export function setDailyState(callback) {
	return {type: SET_DAILY_STATE, callback}
}

export function resetDailyState() {
	return {type: RESET_DAILY_STATE}
}

export function setDailyStateLoading(loading) {
	return setDailyState(dailyState => dailyState.loading = loading)
}

export function setDailyStateComment(comment) {
	return setDailyState(dailyState => dailyState.comment = comment)
}

export function storeDailyState(onSuccess) {
	return (dispatch, getState) => {
		let dailyState = getState().DailyStateModule
		dispatch(setDailyStateLoading(true))
		Backend.request('v1/state', dailyState.toRaw(), "POST").then(response => {
			dispatch(setDailyStateLoading(false))
			dispatch(initDailyState(DailyState.fromRaw(response)))
			if (onSuccess) {
				onSuccess(response)
			}
		}).catch(e => {
			dispatch(setDailyStateLoading(false))
			setFatalError(e)
		})
	}
}

export function loadDailyState() {
	return (dispatch, getState) => {
		dispatch(setDailyStateLoading(true))
		let user = getState().UserModule
		Backend.request('v1/state/' + user.selectedDate.unix(), {}, "GET").then(response => {
			dispatch(setDailyStateLoading(false))
			dispatch(initDailyState(DailyState.fromRaw(response)))
		}).catch(e => {
			dispatch(setDailyStateLoading(false))
			setFatalError(e)
		})
	}
}

export default DailyStateModule
