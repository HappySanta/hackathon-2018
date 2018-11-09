import Backend from "../tools/Backend"
import {setFatalError} from "./FatalError"

const Bootstrap = (state = false, action) => {
	switch (action.type) {
		default:
			return state
	}
}

export function bootstrap() {
	return dispatch => {
		Backend.request('v1/bootstrap', {}).then(r => {
			console.log(r)
		}).catch(e => {
			setFatalError(e)
		})
	}
}

export default Bootstrap
