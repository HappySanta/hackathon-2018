import React, {Component} from "react"
import "./SlideOption.css"

export default class SlideOption extends Component {

	select = null

	setValue(value) {
		this.props.onChange(value)
	}

	render() {
		let {value, list, offset} = this.props
		return <div className="SlideOption">
			<div className="SlideOption__wrapper">
				<div className="SlideOption__visible">
					<span className="SlideOption__selected-value">
						{value}
					</span>
				</div>
				<div className="SlideOption__invisible">
					<select className="SlideOption__select" defaultValue={value}
							onChange={(e) => this.setValue(e.target.value)}>
						{list.map(option => {
							return <option value={option + offset} key={option}>
								{option + offset}
							</option>
						})}
					</select>
				</div>
			</div>
		</div>
	}
}
