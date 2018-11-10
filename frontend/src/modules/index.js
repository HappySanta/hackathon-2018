import {combineReducers} from "redux"
import PageModule from "./PageModule"
import FatalErrorModule from "./FatalErrorModule"
import UserModule from "./UserModule"
import FriendModule from "./FriendModule"

export default combineReducers({
	PageModule,
    FatalErrorModule,
	UserModule,
	FriendModule
})
