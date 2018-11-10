import moment from "moment"

export default class DailyState {

	id
	date
	state
	comment
	loading = false

	static fromRaw(raw) {
		const dailyState = new DailyState()
		dailyState.id = raw.id || 0
		dailyState.date = raw.date || moment()
		dailyState.state = raw.state || null
		dailyState.comment = raw.comment || null
		return dailyState
	}

	toRaw() {
		return {
			date: this.date,
			state: this.state,
			comment: this.comment
		}
	}

	clone() {
		const dailyState = new DailyState()
		dailyState.id = this.id
		dailyState.date = this.date
		dailyState.state = this.state
		dailyState.loading = this.loading
		return dailyState
	}
}


