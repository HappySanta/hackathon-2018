import Backend from "../tools/Backend"
import {setFatalError} from "./FatalErrorModule"
import {initUser} from "./UserModule"
import User from "../entities/User"
import {initDailyState} from "./DailyStateModule"
import DailyState from "../entities/DailyState"

export const SET_BOOTSTRAP = 'BootstrapModule.SET_BOOTSTRAP'

const initState = {
	loaded: false,
	stateSchema: null,
	stateData: null,
}

const BootstrapModule = (state = initState, action) => {
	switch (action.type) {
		case SET_BOOTSTRAP:
			return Object.assign({}, state, action.update)
		default:
			return state
	}
}

export function setBootstrap(update) {
	return {type: SET_BOOTSTRAP, update}
}

export function bootstrap(onSuccess) {
	return (dispatch, getState) => {
		let {loaded} = getState().BootstrapModule
		if (loaded) {
			onSuccess()
			return
		}
		Backend.request('v1/bootstrap', {}).then(r => {
			if (r.user) {
				dispatch(initUser(User.fromRaw(r.user)))
			}
			if (r.schema) {
				dispatch(setBootstrap({stateSchema: r.schema}))
			}
			if (r.state) {
				let {selectedDate} = getState().UserModule
				dispatch(setBootstrap({stateData: r.state}))
				if (r.state[selectedDate.date()]) {
					dispatch(initDailyState(DailyState.fromRaw(r.state[selectedDate.date()])))
				}
			}
			onSuccess(r)
		}).catch(e => {
			dispatch(setFatalError(e))
		})
	}
}

export default BootstrapModule
