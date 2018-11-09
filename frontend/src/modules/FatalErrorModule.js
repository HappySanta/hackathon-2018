const SET_ERROR = "FatalError.SET_ERROR"
const REMOVE_ERROR = "FatalError.REMOVE_ERROR"

const FatalErrorModule = (state = false, action) => {
	switch (action.type) {
		case SET_ERROR:
			return action.error
		case REMOVE_ERROR:
			return false
		default:
			return state
	}
}

export function setFatalError(error) {
	return dispatch => {
		dispatch({
			type: SET_ERROR,
			error: error,
		})
	}
}

export function removeFatalError() {
    return dispatch => {
        dispatch({type: REMOVE_ERROR})
    }
}

export default FatalErrorModule
