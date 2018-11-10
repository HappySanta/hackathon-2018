import React, {Component} from "react"
import {connect} from "react-redux"
import L from "../../lang/L"
import {classNames} from "../../tools/helpers"
import "./DayState.css"

class DayState extends Component {



	getCategories() {
		return [
			{
				name: "mood",
				items: [
					"asdasd",
					"asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd",
				]
			},
			{
				name: "sign",
				items: [
					"asdasd",
					"asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd",
				]
			},
			{
				name: "fill",
				items: [
					"asdasd",
					"asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd",
				]
			},
			{
				name: "events",
				items: [
					"asdasd",
					"asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd","asdasd",
				]
			}
		]
	}

	isActiveItem() {
		return false
	}

	toggleItem(item, index, category) {

	}

	renderItem(item, index, category) {
		const className = classNames({
			"DayState__item" : true,
			"DayState__item--active" : this.isActiveItem(item, index, category),
		})
		return <div onClick={() => this.toggleItem(item, index, category)}
					key={index}
					className={className}>{item}</div>
	}

	renderCategory = (category, index) => {
		return <div className="DayState__category" key={index}>
			<div className="DayState__category-name">{L.t("category_"+category.name)}</div>
			<div className="DayState__category-items">
				{category.items.map( (item, index) => this.renderItem(item, index, category))}
			</div>
		</div>
	}

	render() {
		return <div className="DayState">
			{this.getCategories().map( this.renderCategory )}
		</div>
	}
}

DayState.propTypes = {
	
}

function map(state) {
	return {

	}
}

export default connect(map, {})(DayState)
