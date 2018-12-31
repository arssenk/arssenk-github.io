/**
 * Created by arsen on 30.12.18.
 */
import {SUPPORTED_CURRENCIES_TXT, SUPPORTED_CURRENCIES} from "./config";
import {choosenBoxValue} from "./index";
//Check for current year
export function isCurrentYear(date, currentDate) {
    let thisMonth = parseInt(date.split("-")[1]);
    let thisYear = parseInt(date.split("-")[0]);
    let thisDay = parseInt(date.split("-")[2]);
    let currYear = parseInt(currentDate.split("-")[0]);
    let currMonth = parseInt(currentDate.split("-")[1]);
    let currDay = parseInt(currentDate.split("-")[2]);

    if ((currYear > thisYear) || ((currYear === thisYear) && (currMonth > thisMonth))) {
        return true
    }
    else return (currYear === thisYear) && (currMonth === thisMonth) && (currDay >= thisDay);
}

export function createDeepCopy(o) {
    let r = [];
    for (let i = 0; i < o.length; i++) {
        r.push(Object.assign({}, o[i]))
    }
    return Object.values(r)
}


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
    return number * Math.pow(1 + percentage/ 100, n) - number;
}

export function convertToChosenForGraph(d, convertFrom, convertTo) {
    return d[convertTo]/ d[convertFrom]
}

export function updateTotalValuesGraph2(val1, val2) {
    document.getElementById("graph-2-total-" + 1).value =
        val1 + " " + SUPPORTED_CURRENCIES_TXT[SUPPORTED_CURRENCIES.indexOf(window.choosenBoxValue)];

    document.getElementById("graph-2-total-" + 2).value =
        val2 + " " + SUPPORTED_CURRENCIES_TXT[SUPPORTED_CURRENCIES.indexOf(window.choosenBoxValue)];
}

function getCurrencyObjectByDate(dateItem) {
    for (let i = 0; i < window.currencyHistory.length; i++) {
        if (window.currencyHistory[i].date === dateItem) {
            return window.currencyHistory[i];
        }
    }
}

