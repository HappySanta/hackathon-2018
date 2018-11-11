import React, {Component} from 'react'
import {connect} from "react-redux"
import './BottomPopup.css'

class BottomPopup extends Component {

	onClose() {
		this.props.onClose()
	}

	render() {
		return <div style={this.props.style || {}} className="BottomPopup">
			<div className="BottomPopup__header">
				<div className="BottomPopup__title">
					{this.props.title}
				</div>
				<div className="BottomPopup__close" onClick={() => this.onClose()}>
				</div>
			</div>
			{this.props.children}
			{this.props.footer ? <div className="BottomPopup__footer">
				{this.props.footer}
			</div>: null}
		</div>
	}

}

function mapStateToProps(state) {
	return {

	}
}

export default connect(mapStateToProps, {})(BottomPopup)
