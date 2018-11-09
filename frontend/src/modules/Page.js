import {goBack, push, replace} from "react-router-redux"
import {bootstrap} from "./Bootstrap"
const SET_PAGE = "Page.SET_PAGE"
const SET_PARAMS = 'Page.SET_PARAMS'

export const VIEW_MAIN = 'view_main'
export const PANEL_MAIN = '/'


const initState = {
	params: {}
}

export class Route {

	panelName = ''

	static fromRaw(panelName) {
		let route = new Route()
		route.panelName = panelName
		return route
	}

	getView() {
		let view = getPanelViewMap()[this.panelName]
		return view ? view : VIEW_MAIN
	}
}

function getPanelViewMap() {
	return {}
}

const Page = (state = initState, action) => {
	switch (action.type) {
		case SET_PAGE:
			state.path.push({name: state.name, params: state.params})
			return Object.assign({}, state, {name: action.name}, {params: action.params})
		case SET_PARAMS:
			return {...state, params: action.params}
		default:
			return state
	}
}

export function pushPage(name, params = undefined) {
	return (dispatch, getState) => {
		let currentParams = getState().Page.params
		if (params) {
			dispatch(setPageParams(params))
		} else if (!params && Object.keys(currentParams).length) {
			dispatch(setPageParams({}))
		}
		dispatch(push(name))
	}
}

export function popPage() {
	return goBack()
}

export function replacePage(name) {
	return replace(name)
}

export function subscribeToHistory(history) {
    return (dispatch) => {
        history.listen((location) => {
        	dispatch(handleLocation(location.pathname))
        })
    }
}

export function handleLocation(pathname) {
	return dispatch => {
		let route = getRouteByPath(pathname)
		console.log(route.panelName)
		switch (route.panelName) {
			case PANEL_MAIN:
				dispatch(bootstrap())
				break
			default:
		}
    }
}

export function getPathByPanelName(panelName) {
	return panelName
}

export function getRouteByPath(path) {
	return Route.fromRaw(path)
}

export function setPageParams(params) {
	return {type:SET_PARAMS, params}
}

export default Page
