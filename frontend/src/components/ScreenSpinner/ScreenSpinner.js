import React, {Component} from "react"
import {Spinner as VkSpinner} from '@vkontakte/vkui'
import "./ScreenSpinner.css"

export default class ScreenSpinner extends Component {

	render() {
		return <div className="ScreenSpinner" style={{minHeight: this.props.h}}>
			<div className="ScreenSpinner__inner">
				<VkSpinner/>
			</div>
		</div>
	}
}
