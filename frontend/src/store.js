import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './modules'
import {routerMiddleware} from "react-router-redux"
import {createHashHistory} from 'history'

export const history = createHashHistory({
    hashType: 'noslash'
});

const initialState = {}
const enhancers = []
const middleware = [
	thunk,
	routerMiddleware(history),
]

if (process.env.NODE_ENV === 'development') {
	const devToolsExtension = window.devToolsExtension

	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension())
	}
}

const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers
)

const store = createStore(
	rootReducer,
	initialState,
	composedEnhancers
)

export default store
