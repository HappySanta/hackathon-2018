
const RUB_ID = 643;
const UKR_ID = 980;
const KZ_ID = 398;
const BY_ID = 933;
const EUR_ID = 978;
const USD_ID = 840;

let currencyId = RUB_ID
let currencyWasSet = false

export function setCurrencyId(id) {
    currencyId = id
    currencyWasSet = true
}

export function getCurrencyId() {
    return currencyId
}

export function isCurrencySet() {
    return currencyWasSet
}

export function getMoneyFormatFromVk(vkPrice, multiplie = 1, ifZero = null) {
    let amount = vkPrice.amount * multiplie
    if (amount !== 0) {
        return formatPrice(amount/100, vkPrice.currency.id)
    } else {
        return ifZero
    }
}

export function getMoneyFormat(amount, ifZero) {
    if (amount !== 0) {
        return formatPrice(amount)
    } else {
        return ifZero
    }
}

export function getPriceFormData(data) {
    return data.price.amount / 100
}

function formatPrice(amount, curId = null) {
    if (!amount) {
        amount = 0
    }
    amount = parseInt(amount, 10)
    if (isNaN(amount)) {
        amount = 0
    }
    if (!curId) {
        curId = currencyId
    }
    if (curId === KZ_ID) {
        return (amount).toLocaleString("ru-RU") + ' ' + getCurrencyTag(curId)
    }
    if (curId === UKR_ID) {
        return (amount).toLocaleString("ru-RU") + ' ' + getCurrencyTag(curId)
    }
    if (curId === EUR_ID) {
        return getCurrencyTag(curId)+(amount).toLocaleString("ru-RU").trim()
    }
    if (curId === USD_ID) {
        return getCurrencyTag(curId)+(amount).toLocaleString("ru-RU").trim()
    }
    if (curId === RUB_ID) {
        return (amount).toLocaleString("ru-RU") + ' ' + getCurrencyTag(curId)
    }
    if (curId === BY_ID) {
        return (amount).toLocaleString("ru-RU") + ' ' + getCurrencyTag(curId)
    }
    return (amount).toLocaleString("ru-RU")
}

export function getCurrencyTag(curId) {
    if (curId === KZ_ID) {
        return 'тнг.'
    }
    if (curId === UKR_ID) {
        return 'грн.'
    }
    if (curId === EUR_ID) {
        return '€'
    }
    if (curId === USD_ID) {
        return '$'
    }
    if (curId === RUB_ID) {
        return '₽'
    }
    if (curId === BY_ID) {
        return 'руб.'
    }   
    return ''
}
