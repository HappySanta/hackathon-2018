import 'whatwg-fetch'
import ConnectionError from "./ConnectionError"
import VkSdk from '../Vk/VkSdk'

export default class Backend {

	static __call(method, params, httpMethod = "GET") {
		let url = '/api/' + method

		let requestParams = {
			'method': httpMethod ? httpMethod : "GET",
			'cache': 'no-cache',
			'redirect': 'error',
			'headers': {
				'X-vk-sign': VkSdk.startSearch
			}
		}

		if (httpMethod.toString().toUpperCase() !== "GET") {
			if (!(params instanceof FormData)) {
				requestParams['headers']['Content-Type'] = 'application/json'
			}
			requestParams['body'] = params instanceof FormData ? params : JSON.stringify(params)
		} else {
			url += '?' + Backend.stringify(params)
		}
		return new Promise((resolve, reject) => {
			try {
				fetch(url, requestParams)
					.then(resolve)
					.catch(e => {
						if (e instanceof TypeError) {
							e['network'] = true
							e['message'] = e.message + ' ' + url
						}
						reject(e)
					})
			} catch (e) {
				reject(e)
			}
		})
	}

	static request(method, params, httpMethod = "GET", retry = 5) {
		return new Promise((resolve, reject) => {
			try {
				Backend.__call(method, params, httpMethod)
					.then(r => {
						let contentType = r.headers.get('Content-Type')
						if (contentType && contentType.indexOf('application/json') !== -1) {
							r.json().then(data => {
								if (data.response !== undefined) {
									resolve(data.response)
								} else if (data.error !== undefined && data.error && data.error.message !== undefined) {
									reject(data.error)
								} else {
									reject(data)
								}
							})
						} else {
							if (retry > 0) {
								setTimeout(() => {
									Backend.request(method, params, httpMethod, retry - 1)
										.then(resolve)
										.catch(reject)
								}, Math.random() * 1000)
							} else {
								throw new ConnectionError(
									httpMethod
									+ " "
									+ method
									+ " response "
									+ r.status
									+ " Content-Type: "
									+ contentType
								)
							}
						}
					})
					.catch(e => {
						if (e && e.network && retry > 0) {
							setTimeout(() => {
								Backend.request(method, params, httpMethod, retry - 1)
									.then(resolve)
									.catch(reject)
							}, Math.random() * 1000)
						} else {
							reject(e)
						}
					})
			} catch (e) {
				if (retry > 0) {
					setTimeout(() => {
						Backend.request(method, params, httpMethod, retry - 1)
							.then(resolve)
							.catch(reject)
					}, Math.random() * 1000)
				} else {
					reject(e)
				}
			}
		})
	}

    static stringify(object, asRaw = false, prefix = false) {
        let arr = []
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                let value = object[key]
                if (value === undefined) {
                    continue
                }
                if (typeof value.forEach === 'function') {
                    value.forEach(i => arr.push({k: (prefix ? prefix + '[' + key + ']' : key) + '[]', v: i}))
                } else if (typeof value === 'object') {
                    let resolve = Backend.stringify(value, true, (prefix ? prefix + '[' + key + ']' : key))
                    resolve.forEach(i => arr.push(i))
                } else {
                    arr.push({k: (prefix ? prefix + '[' + key + ']' : key), v: value})
                }
            }
        }
        if (asRaw) {
            return arr
        } else {
            return arr.map(e => e.k + '=' + encodeURIComponent(e.v)).join("&")
        }
    }
}
