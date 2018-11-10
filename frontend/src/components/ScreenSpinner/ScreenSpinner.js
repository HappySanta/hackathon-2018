import React, {Component} from "react"
import {Spinner as VkSpinner} from '@vkontakte/vkui'
import "./ScreenSpinner.css"

export default class ScreenSpinner extends Component {

	render() {
		return <div className="ScreenSpinner">
			<div style={{ height: 100 }}>
				<VkSpinner/>
			</div>
		</div>
	}
}
