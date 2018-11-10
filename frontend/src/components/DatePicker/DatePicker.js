import React, {Component} from "react"
import "./DatePicker.css"
import moment from "moment"

export default class DatePicker extends Component {

	onChange(value) {
		this.props.onChange(moment(value))
	}

	render() {
		let {date} = this.props
		return <div className="DatePicker">
			<div className="DatePicker__wrapper">
				<div className="DatePicker__visible">
					<span>
						{date.getView()}
					</span>
				</div>
				<div className="DatePicker__invisible">
					<input type="date" onChange={(e) => this.onChange(e.target.value)}/>
				</div>
			</div>
		</div>
	}
}
