import {goBack, push, replace} from "react-router-redux"
import {bootstrap, setBootstrap} from "./BootstrapModule"
const SET_PAGE = "Page.SET_PAGE"
const SET_PARAMS = 'Page.SET_PARAMS'

export const VIEW_MAIN = 'view_main'

export const PANEL_MAIN = '/'
export const PANEL_FRIEND_LIST = '/friend_list'
export const PANEL_CYCLE_LENGTH = '/cycle_length'
export const PANEL_MENSTRUATION_LENGTH = '/menstruation_length'
export const PANEL_MENSTRUATED_AT = '/menstruated_at'
export const PANEL_BDATE = '/bdate'


function getTimingPanels() {
	return [PANEL_CYCLE_LENGTH, PANEL_MENSTRUATION_LENGTH, PANEL_MENSTRUATED_AT, PANEL_BDATE]
}

const initState = {
	params: {}
}

export class Route {

	panelId = ''

	static fromRaw(panelId) {
		let route = new Route()
		route.panelId = panelId
		return route
	}

	getView() {
		let view = getPanelViewMap()[this.panelId]
		return view ? view : VIEW_MAIN
	}
}

function getPanelViewMap() {
	let map = {}
	map[PANEL_MAIN] = VIEW_MAIN
	map[PANEL_CYCLE_LENGTH] = VIEW_MAIN
	map[PANEL_MENSTRUATION_LENGTH] = VIEW_MAIN
	map[PANEL_MENSTRUATED_AT] = VIEW_MAIN
	map[PANEL_BDATE] = VIEW_MAIN
	return map
}

const PageModule = (state = initState, action) => {
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
		let currentParams = getState().PageModule.params
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
	return (dispatch, getState) => {
		let route = getRouteByPath(pathname)
		const resolve = (r) => {
			if (r) {
				if (!r.user) {
					if (route.panelId !== PANEL_CYCLE_LENGTH) {
						dispatch(replacePage(PANEL_CYCLE_LENGTH))
						return
					}
				}
			}
			let {id} = getState().UserModule
			if (id && getTimingPanels().indexOf(route.panelId) !== -1) {
				dispatch(replacePage(PANEL_MAIN))
				return
			}
			switch (route.panelId) {
				default:
			}
			dispatch(setBootstrap({loaded: true}))
		}
		dispatch(bootstrap(resolve))
	}
}

export function getPathByPanelId(panelId) {
	return panelId
}

export function getRouteByPath(path) {
	return Route.fromRaw(path)
}

export function setPageParams(params) {
	return {type:SET_PARAMS, params}
}

export default PageModule
