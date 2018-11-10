import User from "../entities/User"
import SplitDate from "../entities/SplitDate"

const initState = User.fromRaw({})

const SET_USER = 'UserModule.SET_USER'
const RESET_USER = 'UserModule.RESET_USER'

const UserModule = (state = initState, action) => {
	switch (action.type) {
		case SET_USER:
			let user = state.clone()
			action.callback(user)
			return user
		case RESET_USER:
			return initState
		default:
			return state
	}
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

export default UserModule
