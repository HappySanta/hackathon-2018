import SplitDate from "./SplitDate"

export default class User {

	id
	cycleLength
	menstruationLength
	menstruatedAt
	bdate

	getStringCycleLength() {
		return this.cycleLength ? '' + this.cycleLength : ''
	}

	getStringMenstruationLength() {
		return this.menstruationLength ? '' + this.menstruationLength : ''
	}

	static fromRaw(raw) {
		const user = new User()
		user.id = raw.id || 0
		user.cycleLength = raw.cycle_length || 0
		user.menstruationLength = raw.menstruation_length || 0
		user.menstruatedAt = SplitDate.fromRaw(raw.menstruated_at)
		user.bdate = SplitDate.fromRaw(raw.bdate)
		return user
	}
	t
	clone() {
		const user = new User()
		user.id = this.id
		user.cycleLength = this.cycleLength
		user.menstruationLength = this.menstruationLength
		user.menstruatedAt = this.menstruatedAt.clone()
		user.bdate = this.bdate.clone()
		return user
	}
}
