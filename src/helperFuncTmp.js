import {rebaseDate} from "./apiProcessing";
import {COLORS_FOR_CURR} from "./config";
import * as d3 from "d3";
import {renderBarChart} from "./graphBar";
import {
    addCurrencySelect,
    addInputCurrencyForm,
    addOptionToSelectCurrency,
    addOutputCurrencyForm,
    addPercentageCheckbox,
    addPercentageForm
} from "./addToHTMLtmp";
import {renderLineChart} from "./lineChart";
import {getChosenCurrency, getInputValues} from "./getters";
import {convertToChosenCurrency} from "./converters";


export function addInputForms() {
    addCurrencySelect();
    addPercentageCheckbox();

    let currCurrency;
    for (let currInd = 0; currInd < SUPPORTED_CURRENCIES.length; currInd++) {
        currCurrency = SUPPORTED_CURRENCIES[currInd];
        addInputCurrencyForm(currCurrency);
        addOptionToSelectCurrency(currCurrency);
        addPercentageForm(currCurrency);
        addOutputCurrencyForm(currCurrency)
    }
}
// Updates all forms, graphs, button and checkbox
export function updateStatus() {

    rebaseDate(window.currencyHistory);

    updateCurrencyInTitle();

    inputHandler();

    percentageInputHandler();

    addBackgroundColorToInputForm();

    renderLineChart();

    renderBarChart(window.currencyHistory);
}

export function addUpdateFunctionChooseBox() {

    document.getElementById('currency-choose-box-id').onchange = function () {
        updateStatus();
    };
}

//
// function updateDropDownValue() {
//     let chooseBox = document.getElementById("currency-choose-box-id");
//     window.choosenBoxValue = chooseBox.options[chooseBox.selectedIndex].value;
//     return chooseBox.options[chooseBox.selectedIndex].value;
// }

function updateCurrencyInTitle() {
    document.getElementById('output-current-currency').innerHTML = "В моїй валюті, "
        + SUPPORTED_CURRENCIES_TXT[SUPPORTED_CURRENCIES.indexOf(getChosenCurrency())];
}

function parseCurrencyInput() {
    for (let i = 1; i < SUPPORTED_CURRENCIES.length + 1; i++) {
        // Parse spaces
        document.getElementById("currency_" + i).value =
            document.getElementById("currency_" + i).value.split(" ").join("");


        //Parse empty string
        if (document.getElementById("currency_" + i).value === "") {
            document.getElementById("currency_" + i).value = 0;
        }

        if (!isNumber(document.getElementById("currency_" + i).value)) {
            alert("Currency " + SUPPORTED_CURRENCIES[i - 1] + " needs to be getCurrencyData number");
            document.getElementById("currency_" + i).value = 0;
            return 0;
        }
    }
    return 1;
}

function parsePercentageInput() {
    for (let i = 1; i < SUPPORTED_CURRENCIES.length + 1; i++) {
        if (!isNumberForPercentage(document.getElementById("input_percentage_" + i).value)) {
            alert("Percentage " + i + " needs to be in range 0-100");
            document.getElementById("input_percentage_" + i).value = 0;
            return 0
        }
    }
    return 1;
}


function writeToOutputForms() {
    let inputCurrencyValues = getInputValues();
    for (let i = 1; i < SUPPORTED_CURRENCIES.length + 1; i++) {
        let valueToWrite = +convertToChosenCurrency(inputCurrencyValues[i - 1],
            SUPPORTED_CURRENCIES[i - 1], getChosenCurrency());

        if (valueToWrite > 1000) {
            valueToWrite = Math.round(valueToWrite)
        }
        document.getElementById("currency_converted_" + i).value =
            scaleNumber(valueToWrite);
    }
}

export function inputHandler() {
    parseCurrencyInput();
    writeToOutputForms();

    renderBarChart(window.currencyHistory)
}


// TODO first two lines another function
export function percentageInputHandler() {

    for (let i = 0; i < document.getElementsByClassName("convert-table__input-percentage-form").length; i++) {
        document.getElementsByClassName("convert-table__input-percentage-form")[i].disabled = !document.getElementById("percentage_checkbox").checked;
    }

    parsePercentageInput();
    renderBarChart(window.currencyHistory)
}

function addBackgroundColorToInputForm() {
    let items = document.getElementsByClassName("convert-table__currency-img");
    for (let i = 0; i < items.length; i++) {
        let currEll = items[i];
        currEll.style["background-color"] = COLORS_FOR_CURR[i];
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function scaleNumber(number) {
    let numberToWorkWith = number.toString();
    if (numberToWorkWith.length > 6) {
        return d3.format(".3s")(number)
    }
    else {
        return addSpacesToNumber(numberToWorkWith)
    }
}


function addSpacesToNumber(number) {
    return (d3.format(",")(number)).split(",").join(" ");
}


export function isNumberForPercentage(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n >= 0 && n <= 100;
}


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