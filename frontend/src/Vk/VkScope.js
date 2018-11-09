
export default class VkScope {

	static NOTIFY = 1
	static FRIENDS = 2
	static PHOTOS = 8
	static AUDIO = 8
	static VIDEO = 16
	static PAGES = 128
	static RIGHT_LINK = 256
	static STATUS = 1024
	static NOTES = 2048
	static MESSAGES = 4096
	static WALL = 8192
	static AND = 32768
	static OFFLINE = 65536
	static DOCS = 131072
	static GROUPS = 262144
	static NOTIFICATIONS = 524288
	static STATS = 1048576
	static EMAIL = 4194304
	static MARKET = 134217728

	/**
	 * Битовая маска из массива прав
	 * @param {number[]} arrayOfScopes
	 * @returns {number}
	 */
	static superScope(arrayOfScopes) {
		let ss = 0
		arrayOfScopes.forEach( s => ss = ss | s )
		return ss
	}

	/**
	 * Есть ли указанное право в маске
	 * @param {number} mask
	 * @param {number} scope
	 * @returns {boolean}
	 */
	static hasScope(mask, scope) {
		return (mask & scope) === scope
	}

}
