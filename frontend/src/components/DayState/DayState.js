import React, {Component} from "react"
import {connect} from "react-redux"
import L from "../../lang/L"
import {classNames} from "../../tools/helpers"
import "./DayState.css"
import {isItemSelected, setDailyStateComment, storeDailyState, toggleStateItem} from "../../modules/DailyStateModule"
import {FormLayout, Textarea, Button} from "@vkontakte/vkui"
import WaitDots from "../WaitDots/WaitDots"

class DayState extends Component {

	getCategories() {
		return this.props.stateSchema
	}

	isActiveItem(item, index, category) {
		return isItemSelected(this.props.dailyStateData, category.name, index)
	}

	toggleItem(item, index, category) {
		this.props.toggleStateItem(category.name, index)
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
		if (!this.props.isBadDay && category.name === "fill") return null
		return <div className="DayState__category" key={index}>
			<div className="DayState__category-name">{L.t("category_"+category.name)}</div>
			<div className="DayState__category-items">
				{category.items.map( (item, index) => this.renderItem(item, index, category))}
			</div>
		</div>
	}

	render() {
		return <div className="DayState">
			<div className="DayState__comment">
				<FormLayout>
					<Textarea top={L.t('comment')}
							  onChange={(e) => this.props.setDailyStateComment(e.target.value)}
							  defaultValue={this.props.comment || ""}
							  placeholder={L.t('comment_placeholder')} />
					<Button size="xl" onClick={() => this.props.storeDailyState()}>
						{this.props.loading ? <WaitDots/> : L.t('save')}
					</Button>
				</FormLayout>
			</div>
			{this.getCategories().map( this.renderCategory )}
		</div>
	}
}

function map(state) {
	return {
		stateSchema: state.BootstrapModule.stateSchema,
		dailyStateData: state.DailyStateModule.state,
		loading: state.DailyStateModule.loading,
		comment: state.DailyStateModule.comment,
	}
}

export default connect(map, {toggleStateItem, setDailyStateComment, storeDailyState})(DayState)
