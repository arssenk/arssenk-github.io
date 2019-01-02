import {SUPPORTED_CURRENCIES} from "./config";


export function getInputValues() {
    let valueCurrencyArray = [];
    for (let i = 1; i < SUPPORTED_CURRENCIES.length + 1; i++) {
        valueCurrencyArray[i - 1] = +document.getElementById("currency_" + i).value;
    }
    return valueCurrencyArray;

}

export function getConvertedValues() {
    let convertedCurrencyArray = [];
    for (let i = 1; i < SUPPORTED_CURRENCIES.length + 1; i++) {
        convertedCurrencyArray[i - 1] = +document.getElementById("currency_converted_" + i).value;
    }
    console.log("getCurrencyData", convertedCurrencyArray);
    return convertedCurrencyArray;
}

export function getPercentageValues() {
    let percentageCurrencyArray = [];
    for (let i = 1; i < SUPPORTED_CURRENCIES.length + 1; i++) {
        percentageCurrencyArray[i - 1] = +document.getElementById("input_percentage_" + i).value;
    }
    return percentageCurrencyArray;
}

export function getTotalConvertedValue() {
    let convertedValues = getConvertedValues();
    return convertedValues.reduce((a, b) => a + b, 0);
}


export function getCurrencyObjectByDate(dateItem) {
    for (let i = 0; i < window.currencyHistory.length; i++) {
        if (window.currencyHistory[i].date === dateItem) {
            return window.currencyHistory[i];
        }
    }
}
