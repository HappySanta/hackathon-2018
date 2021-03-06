import moment from "moment/moment"
import 'moment/locale/ru'

export default class SplitDate {

	date

	static fromRaw(timestamp) {
		let splitDate = new SplitDate()
		splitDate.date = timestamp ? moment(timestamp, 'X') : moment()
		return splitDate
	}

	getView() {
		return this.date.format('D MMMM YYYY')
	}

	timestampMs() {
		return this.date.valueOf()
	}

	timestamp() {
		return this.date.unix()
	}

	format(value) {
		return this.date.format(value)
	}

	clone() {
		const splitDate = new SplitDate()
		splitDate.date = this.date
		return splitDate
	}
}
