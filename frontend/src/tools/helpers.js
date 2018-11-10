import React from 'react'
import L from "../lang/L"
import moment from "moment/moment"
import VkSdk from "../Vk/VkSdk"

export function devErrorLog(e) {
	if (process.env.NODE_ENV === 'development') {
		console.error(e)
	}
}

export function devLog(any) {
	if (process.env.NODE_ENV === 'development') {
		console.log(any)
	}
}

export function throwDevError(error) {
	if (process.env.NODE_ENV === 'development') {
		throw error
	}
}

export function isRetina() {
	return window.devicePixelRatio > 1
}

export function isMobile() {
	return true
}

function parseLink(text,pref,cfg = {}) {
    let parts = text.split(/(\[[idclubpage0-9\-_]+\|.*?\]|<.*?>)/gmu)
    if (parts.length === 1) {
        return parts[0]
    }
    let res = []
    parts.forEach( (t,i) => {
        if (t.match(/^\[[idclubpage0-9\-_]+\|.*?\]$/gmu) && !cfg['noLink']) {
            let tag = t.split('|')
            let href = 'https://vk.com/' + tag[0].replace('[', '')
            let text = tag[1].replace(']', '')
            res.push(<a href={href} target="_blank" key={pref + '_' + i}>{text}</a>)
        } else if (t.match(/^<.*?>$/gmu) && !cfg['noStrong']) {
            res.push(<strong key={pref + '_' + i}>{t.substr(1, t.length-2)}</strong>)
        } else {
            res.push(t)
        }
    } )
    return res
}

export function nToBr(string, cfg = {}) {
	string = string || ""
	if (!cfg['noTypography']) {
        string = string.replace(/&shy;/g, "\u00AD")
        string = string.replace(/&nbsp;/g, "\u00A0")
        string = string.replace(/&#8209;/g, "\u2011")
    }
    let stringArray = string.split('\n')
    let length = stringArray.length
    let result = []
    for (let i = 0; i < length; i++) {
		result.push(parseLink(stringArray[i], i, cfg))
        if (i !== length - 1) {
            result.push(<br key={i}/>)
        }
    }
    return result
}

export function getPeriod(startAt, endAt) {
	if (!startAt) {
		let endFormat = moment().year() !== moment(endAt, 'X').year() ? 'D MMMM YYYY' :  'D MMMM'
		endAt = moment(endAt, 'X').format(endFormat)
		return L.t('action_active_till', {date: endAt})
	} else {
		let endAtYear = moment(endAt, 'X').year()
		let startAtYear = moment(startAt, 'X').year()
		let currentYear = moment().year()
		if (startAtYear !== endAtYear || currentYear !== startAtYear || currentYear !== endAtYear) {
			endAt = moment(endAt, 'X').format('D MMMM YYYY')
			startAt = moment(startAt, 'X').format('D MMMM YYYY')
		} else {
			let endAtMonth = moment(endAt, 'X').month()
			let startAtMonth = moment(startAt, 'X').month()
			let startFormat = null
			if (endAtMonth !== startAtMonth) {
				startFormat = 'D MMMM'
			} else {
				startFormat = 'D'
			}
			endAt = moment(endAt, 'X').format('D MMMM')
			startAt = moment(startAt, 'X').format(startFormat)
		}
		return L.t('duration_time', {date: startAt + ' - ' + endAt})
	}
}

export function getActionLink(groupId) {
	return getCatalogLink() + "_-" + groupId
}

export function getCatalogLink() {
	return 'https://vk.com/app' + VkSdk.getStartParams().apiId
}

export function isDevEnv() {
	return process.env.NODE_ENV === 'development'
}

export function isIphoneX() {
	return /iphone/i.test(window.navigator.userAgent) && window.screen.height === 812
}

export function classNames(object) {
	let names = []
	for(let key in object) {
		if (object.hasOwnProperty(key) && object[key]) {
			names.push(key)
		}
	}
	return names.join(" ")
}


/**
 * @param cycleLength
 * @param lastStartDayTimestampMs
 * @param now
 * @return Number
 */
export function GetDayOfCycle(cycleLength, lastStartDayTimestampMs, now = null) {
	const lastStartDay = moment(lastStartDayTimestampMs).startOf('day')
	if (now === null) {
		now = moment().startOf('day')
	} else {
		now.startOf('day')
	}
	if (now.isBefore(lastStartDay)) {
		const daysBeforeStartCycle = Math.abs(lastStartDay.diff(now, 'days'))
		if (daysBeforeStartCycle < cycleLength) {
			return cycleLength - daysBeforeStartCycle
		} else {
			return cycleLength - (daysBeforeStartCycle - (Math.floor(daysBeforeStartCycle/cycleLength)*cycleLength))
		}
	}
	const daysPerLastCycle = Math.abs(lastStartDay.diff(now, 'days'))
	if (daysPerLastCycle < cycleLength) {
		return daysPerLastCycle
	} else {
		return daysPerLastCycle - (Math.floor(daysPerLastCycle/cycleLength)*cycleLength)
	}
}


function test() {
	const cycleLength = 28
	const lastStartDayTimestampMs = moment('2018-11-01').valueOf()

	let zero = GetDayOfCycle(cycleLength, lastStartDayTimestampMs, moment('2018-11-01'))
	console.assert(zero === 0, "Ожидалось что это 0 день цикла, " + zero)

	let ten = GetDayOfCycle(cycleLength, lastStartDayTimestampMs, moment('2018-11-10'))
	console.assert(ten === 9, "Ожидалось что это 9 день цикла, " + ten)

	let zero2 = GetDayOfCycle(cycleLength, lastStartDayTimestampMs, moment('2018-11-29'))
	console.assert(zero2 === 0, "Ожидалось что это 0 день цикла, " + zero2)

	let lastDayOfCycle = GetDayOfCycle(cycleLength, lastStartDayTimestampMs, moment('2018-11-28'))
	console.assert(lastDayOfCycle === cycleLength-1, "Ожидалось что это последний день цикла, " + lastDayOfCycle)

	let lastDayOfCycleBefore = GetDayOfCycle(cycleLength, lastStartDayTimestampMs, moment('2018-10-31'))
	console.assert(lastDayOfCycleBefore === cycleLength-1, "Ожидалось что это последний день цикла, " + lastDayOfCycleBefore)

	let tenBeforeStart = GetDayOfCycle(cycleLength, lastStartDayTimestampMs, moment('2018-10-13'))
	console.assert(tenBeforeStart === 9, "Ожидалось что это 9 день цикла, " + tenBeforeStart)

	let tenBeforeStart2 = GetDayOfCycle(cycleLength, lastStartDayTimestampMs, moment('2018-09-15'))
	console.assert(tenBeforeStart2 === 9, "Ожидалось что это 9 день цикла, " + tenBeforeStart2)
}

test()
