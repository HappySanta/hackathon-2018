import {combineReducers} from "redux"
import PageModule from "./PageModule"
import FatalErrorModule from "./FatalErrorModule"
import UserModule from "./UserModule"
import FriendModule from "./FriendModule"
import BootstrapModule from "./BootstrapModule"
import DailyStateModule from "./DailyStateModule"

export default combineReducers({
	PageModule,
    FatalErrorModule,
	UserModule,
	BootstrapModule,
	FriendModule,
	DailyStateModule,
})
