import {SUPPORTED_CURRENCIES, SUPPORTED_CURRENCIES_ALL} from "./config";
import {choosenBoxValue} from "./index";
import {isCurrentYear} from "./tmp_1";

//Generate api requests for year back
export function generateYearBack(currDate, url, userKey) {
    let currMonth = parseInt(currDate.split("-")[1]);
    let currYear = parseInt(currDate.split("-")[0]);
    let result = [];
    const maxMonth = 12;
    let monthToWrite = 0;
    let yearToWrite = 0;
    for (let month = 1; month < maxMonth + 1; month++) {
        if ((month + currMonth) <= maxMonth) {
            monthToWrite = month + currMonth;
            yearToWrite = currYear - 1
        }
        else {
            monthToWrite = month - (maxMonth - currMonth);
            yearToWrite = currYear;
        }
        for (let dayToWrite = 1; dayToWrite <= getdaysInMonth(yearToWrite, monthToWrite); dayToWrite++) {
            if (isCurrentYear(convertToYYMMDDFormat(yearToWrite, monthToWrite, dayToWrite), currDate)) {
                result.push(convertToYYMMDDFormat(yearToWrite, monthToWrite, dayToWrite));
            }
        }
    }

    for (let i = 0; i < result.length; i++) {
        if (result[i] !== currDate) {
            result[i] = url + "historical/" + result[i] + ".json?app_id=" + userKey;
        }
        else {
            result.splice(i, 1)
        }
    }
    return result
}



//Creates objects with supported currencies
export function processDataApi(data) {
    let neededCurrencies = SUPPORTED_CURRENCIES_ALL;
    let tmp = [];
    for (let currentCurrency = 0; currentCurrency < neededCurrencies.length; currentCurrency++) {
        tmp[neededCurrencies[currentCurrency]] = data["rates"][neededCurrencies[currentCurrency]];

        //If added currency is not in api call
        if (data["rates"][neededCurrencies[currentCurrency]] === undefined) {
            alert("Your added currency is not supported");
            throw "Your added currency is not supported";
        }
    }
    tmp["date"] = data["date"];

    return tmp;
}

//Setting a new currency base
export function rebaseDate(data) {
    for (let i = 0; i < data.length; i++) {
        let tmpBaseValue = data[i][window.choosenBoxValue];
        for (let currencyItemIndex = 0; currencyItemIndex < SUPPORTED_CURRENCIES_ALL.length; currencyItemIndex++) {
            data[i][SUPPORTED_CURRENCIES_ALL[currencyItemIndex]] = data[i][SUPPORTED_CURRENCIES_ALL[currencyItemIndex]] / tmpBaseValue
        }
    }

    return data;
}

//Creating dates for prediction points
export function createDatesAYearAhead(currentDate) {
    let result = [];
    let currYear = parseInt(currentDate.split("-")[0]);
    let currMonth = parseInt(currentDate.split("-")[1]);
    let currDay = parseInt(currentDate.split("-")[2]);
    let monthToWrite = 0;
    let yearToWrite = 0;
    for (let i = 1; i <= 4; i++) {

        if (3 * i + currMonth > 12) {
            monthToWrite = 3 * i + currMonth - 12;
            yearToWrite = currYear + 1;
        }
        else {
            monthToWrite = 3 * i + currMonth;
            yearToWrite = currYear;
        }
        result.push(convertToYYMMDDFormat(yearToWrite, monthToWrite, currDay));
    }
    return result;
}


export function getdaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

export function convertToYYMMDDFormat(year, month, day) {
    return year + "-" +
        ('0' + month).slice(-2) + "-" + ('0' + day).slice(-2);
}

export function addPredictionPoints(currencyHistory, currentDate, lastCurrencies) {
    let tmpDataItem;
    let datesToAssign = createDatesAYearAhead(currentDate);
    for (let dataIndex = 0; dataIndex <= 3; dataIndex++) {
        tmpDataItem = Object.assign({}, lastCurrencies);
        tmpDataItem.date = datesToAssign[dataIndex];
        let currCurrencies = SUPPORTED_CURRENCIES.filter(item => item !== choosenBoxValue);

        for (let currencyIndex = 0; currencyIndex < currCurrencies.length; currencyIndex++) {
            tmpDataItem[currCurrencies[currencyIndex]] -= tmpDataItem[currCurrencies[currencyIndex]]
                * (dataIndex) / 40
        }
        currencyHistory.push(tmpDataItem);

    }
    return currencyHistory;
}