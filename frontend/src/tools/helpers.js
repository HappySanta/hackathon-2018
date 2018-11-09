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
