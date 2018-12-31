import {rebaseDate} from "./apiProcessing";
import {COLORS_FOR_CURR, SUPPORTED_CURRENCIES, SUPPORTED_CURRENCIES_TXT} from "./config";
import {lastCurrencies} from "./index";
import * as d3 from "d3";
import {renderBarChart} from "./graphBar";
import {
    addCurrencySelect,
    addInputCurrencyForm,
    addOptionToSelectCurrency,
    addPercentageCheckbox,
    addPercentageForm,
    outputForm
} from "./addToHTMLtmp";
import {startRenderingLineChart} from "./lineChart";


export function addInputForms() {
    addCurrencySelect();
    addPercentageCheckbox()

    let currCurrency;
    for (let currInd = 0; currInd < SUPPORTED_CURRENCIES.length; currInd++) {
        currCurrency = SUPPORTED_CURRENCIES[currInd];
        addInputCurrencyForm(currCurrency);
        addOptionToSelectCurrency(currCurrency)
        addPercentageForm(currCurrency);
        outputForm(currCurrency)
    }
}
// Updates all forms, graphs, button and checkbox
export function updateStatus(valueCurrencyArray, valuePercentageArray, totalConverted) {
    console.log("choser", window.choosenBoxValue);
    updateDropDownValue();
    console.log("after cghosen ", window.choosenBoxValue);

    rebaseDate(window.currencyHistory);
    console.log("after cghosen 1", window.choosenBoxValue);

    updateCurrencyInTitle(window.choosenBoxValue);
    console.log("after cghosen 2", window.choosenBoxValue);

    addToPercentage(valuePercentageArray);
    console.log("after cghosen 3", window.choosenBoxValue);

    addTo(valueCurrencyArray, totalConverted);
    console.log("after cghosen 4", window.choosenBoxValue);

    addBackgroundColorToInputForm();
    console.log("hos", window.currencyHistory);
    startRenderingLineChart(window.currencyHistory);

    renderBarChart(window.currencyHistory);

}

export function addUpdateFunctionChooseBox(valueCurrencyArray, valuePercentageArray, totalConverted) {

    document.getElementById('currency-choose-box-id').onchange = function () {
        updateStatus(valueCurrencyArray, valuePercentageArray, totalConverted);
    };
}


function updateDropDownValue() {
    let chooseBox = document.getElementById("currency-choose-box-id");
    window.choosenBoxValue = chooseBox.options[chooseBox.selectedIndex].value;
    return chooseBox.options[chooseBox.selectedIndex].value;
}

function updateCurrencyInTitle() {
    document.getElementById('output-current-currency').innerHTML = "В моїй валюті, "
        + SUPPORTED_CURRENCIES_TXT[SUPPORTED_CURRENCIES.indexOf(window.choosenBoxValue)];
}


export function addTo(valueCurrencyArray, totalConverted) {
    let tmpTotal = 0;
    for (let i = 1; i < SUPPORTED_CURRENCIES.length + 1; i++) {
        // Parse spaces
        document.getElementById("currency_" + i).value =
            document.getElementById("currency_" + i).value.split(" ").join("");

        //Parse empty string
        if (document.getElementById("currency_" + i).value === "") {
            document.getElementById("currency_" + i).value = 0;
        }

        //Convert to chosen curr and write to output
        if (isNumber(document.getElementById("currency_" + i).value)) {

            valueCurrencyArray[i - 1] = +document.getElementById("currency_" + i).value;

            let valueToWrite = convertToChosenCurrency(valueCurrencyArray[i - 1],
                SUPPORTED_CURRENCIES[i - 1], window.choosenBoxValue);

            if (valueToWrite > 1000) {
                valueToWrite = Math.round(valueToWrite)
            }

            tmpTotal += +valueToWrite;

            document.getElementById("currency_converted_" + i).value =
                scaleNumber(valueToWrite);

            //Format number
            document.getElementById("currency_" + i).value = addSpacesToNumber(document.getElementById("currency_" + i).value);
        }
        else {
            alert("Currency " + i + " needs to be a number")
        }
    }
    totalConverted = tmpTotal;
    renderBarChart(window.currencyHistory)

}

export function addToPercentage(valuePercentageArray) {
    for (let i = 0; i < document.getElementsByClassName("convert-table__input-percentage-form").length; i++) {
        document.getElementsByClassName("convert-table__input-percentage-form")[i].disabled = !document.getElementById("percentage_checkbox").checked;
    }

    for (let i = 1; i < SUPPORTED_CURRENCIES.length + 1; i++) {
        if (isNumberForPercentage(document.getElementById("input_percentage_" + i).value)) {
            valuePercentageArray[i - 1] = +document.getElementById("input_percentage_" + i).value;
        }
        else {
            alert("Percentage " + i + " needs to be in range 0-100");
            document.getElementById("input_percentage_" + i).value = 0
        }
    }
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
//
// function addBackgroundColorToInputForm() {
//     let items = document.getElementsByClassName("convert-table__currency-img");
//     for (let i = 0; i < items.length; i++) {
//         let currEll = items[i];
//         currEll.style["background-color"] = COLORS_FOR_CURR[i];
//         // currEll.style["border-radius"] = "7px";
//     }
// }
