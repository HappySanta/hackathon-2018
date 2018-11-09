import React, {Component} from "react"
import {nToBr} from "../../tools/helpers"
import "./Error.css"

export default class Error extends Component {

	render() {
		let text = ''
		let e = this.props.error || {}
		if (e.message) {
			text += e.message || ''
			text += "\n"
		}
		if (e.code) {
			text += e.code || ''
			text += "\n"
		}
		if (e.stack) {
			text += e.stack
			text += "\n"
		}
		if (text === '') {
			try {
				text = JSON.stringify(e, null, 2)
			} catch (e) {
				text = "Empty text and cant't json stringify"
			}
		}
		text = window.navigator.userAgent + "\n\n" + text
		let href = window.location.href
			.replace(/sid=([A-z0-9]+)/, '[cut]')
			.replace(/access_token=([A-z0-9]+)/, '[cut]')
			.replace(/sign=([A-z0-9]+)/, '[cut]')
		text = href + "\n\n" + text
		return (
			<div className="Error">
				{this.props.onClose ? [<span key="1" onClick={ () => this.props.onClose() } className="href">Закрыть</span>,<br key="2"/>]: null}
				Упс, что-то сломалось
				<br/>
				<br/>
				<div>{nToBr(text)}</div>
			</div>
		)
	}
}
