import {lastCurrencies} from "./index";
import {getCurrencyObjectByDate} from "./getters";

export function convertToChosenCurrencyWithDate(number, convertFrom, convertTo, date) {
    if (number === 0) {
        return 0
    }
    if (convertFrom === convertTo) {
        return number;
    }

    return number * getCurrencyObjectByDate(date)[convertTo] / getCurrencyObjectByDate(date)[convertFrom]
}

export function convertComplexPercentage(number, percentage, n) {
    return number * Math.pow(1 + percentage / 100, n) - number;
}

export function convertToChosenForGraph(d, convertFrom, convertTo) {
    return d[convertTo] / d[convertFrom]
}

export function convertToChosenCurrency(number, convertFrom, convertTo) {
    return (number * lastCurrencies[convertTo] / lastCurrencies[convertFrom]).toFixed(2);
}

export function convertToYYMMDDFormat(year, month, day) {
    return year + "-" +
        ('0' + month).slice(-2) + "-" + ('0' + day).slice(-2);
}
