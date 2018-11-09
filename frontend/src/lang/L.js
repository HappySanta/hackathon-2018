import i18next from 'i18next'
import ru from './locales/ru'

export default class L {

	static lang = 'ru'

	static init(language) {
		return new Promise((resolve, reject) => {
			if (['en', 'ua', 'ru', 'by'].indexOf(language) === -1) {
				language = 'ru'
			}
			let resource = {
				ru: ru()
			}
			L.lang = language
			if (!resource.hasOwnProperty(language)) {
				import('./locales/' + language).then(res => {
                    if (language === 'ua') {
                        language = 'uk'
					}
					resource[language] = res.default()
					L.initI18n(language, resource).then(resolve).catch(reject)
				}).catch(reject)
			} else {
				L.initI18n(language, resource).then(resolve).catch(reject)
			}
		})
	}

	static initI18n(lang, resource) {
		return new Promise( (resolve, reject) => {
            try {
                i18next.init({
                    lng: lang,
                    resources: resource,
                    fallbackLng: "ru"
                }, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        L.lang = lang
                        resolve()
                    }
                })
            } catch (err) {
            	reject(err)
			}
		} )

	}

	static t(key, params) {
		return i18next.t(key, params)
	}
}
