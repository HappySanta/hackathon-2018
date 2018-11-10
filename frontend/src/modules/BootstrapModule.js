import Backend from "../tools/Backend"
import {setFatalError} from "./FatalErrorModule"
import {setUser} from "./UserModule"
import User from "../entities/User"
import {PANEL_CYCLE_LENGTH, replacePage} from "./PageModule"

export const SET_BOOTSTRAP = 'BootstrapModule.SET_BOOTSTRAP'

const initState = {
	loaded: false,
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
				dispatch(setUser(User.fromRaw(r.user)))
			}
			dispatch(setBootstrap({loaded: true}))
			onSuccess(r)
		}).catch(e => {
			setFatalError(e)
		})
	}
}

export default BootstrapModule
