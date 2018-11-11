import DailyState from "../entities/DailyState"
import Backend from "../tools/Backend"
import {setFatalError} from "./FatalErrorModule"
import {setBootstrap} from "./BootstrapModule"

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

export function setDailyStateData(state) {
	return setDailyState(dailyState => dailyState.state = state)
}

export function toggleStateItem(categoryName, itemIndex) {
	return (dispatch, getState) => {
		let dailyState = getState().DailyStateModule
		let currentState = Object.assign({}, dailyState.state)
		if (currentState[categoryName] === undefined) {
			currentState[categoryName] = []
		}
		let indexOfItemIndex = currentState[categoryName].indexOf(itemIndex)
		if (indexOfItemIndex === -1) {
			currentState[categoryName].push(itemIndex)
		} else {
			currentState[categoryName].splice(indexOfItemIndex, 1)
			if (!currentState[categoryName].length) {
				delete currentState[categoryName]
			}
		}
		dispatch(setDailyStateData(currentState))
		dispatch(storeDailyState())
	}
}

export function isItemSelected(currentState, categoryName, itemIndex) {
	return currentState[categoryName] !== undefined && Array.isArray(currentState[categoryName]) && currentState[categoryName].indexOf(itemIndex) !== -1
}

export function storeDailyState() {
	return (dispatch, getState) => {
		let dailyState = getState().DailyStateModule
		dispatch(setDailyStateLoading(true))
		Backend.request('v1/state', dailyState.toRaw(), "POST").then(response => {
			dispatch(setDailyStateLoading(false))
			dispatch(dispatch(setBootstrap({stateData: response})))
		}).catch(e => {
			dispatch(setDailyStateLoading(false))
			setFatalError(e)
		})
	}
}

export function changeDay(moment) {
	return (dispatch, getState) => {
		let {stateData} = getState().BootstrapModule
		if (stateData[moment.date()]) {
			console.log(1)
			dispatch(initDailyState(DailyState.fromRaw(stateData[moment.date()])))
		} else {
			console.log(2)
			dispatch(initDailyState(DailyState.fromRaw({date: moment.unix()})))
		}
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
