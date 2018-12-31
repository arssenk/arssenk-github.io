/**
 * Created by arsen on 29.12.18.
 */
import {SUPPORTED_CURRENCIES} from "./config";
import {a} from "./tmp";
import {addInputForms, addUpdateFunctionChooseBox, updateStatus} from "./helperFuncTmp";
import {addPredictionPoints} from "./apiProcessing";
import {disableForms} from "./disableForms";
import {renderBarChart} from "./graphBar";
import {addCurrencySelect} from "./addToHTMLtmp";

let quarterMonth = [];

export let totalConverted = 0;

export let currentDate;

export let currencyHistory;
export let lastCurrencies = [];

export let valueCurrencyArray = [];
export let valuePercentageArray = [];

for (let i = 0; i < SUPPORTED_CURRENCIES.length; i++) {
    valueCurrencyArray.push(0);
    valuePercentageArray.push(0);
}
addInputForms();


let chooseBox = document.getElementById("currency-choose-box-id");
window.choosenBoxValue = chooseBox.options[chooseBox.selectedIndex].value;



let currencyData = a();


currencyData.then(resp => {
    lastCurrencies = resp[resp.length - 1];
    currentDate = lastCurrencies.date;
    addPredictionPoints(resp, currentDate, lastCurrencies);
    window.currencyHistory = resp;
    disableForms(0);
    console.log("out")
    addUpdateFunctionChooseBox(valueCurrencyArray,valuePercentageArray, totalConverted);

    updateStatus(valueCurrencyArray, valuePercentageArray, totalConverted);
    console.log('up to')
    // renderBarChart(currencyHistory);
});

// }).then(res => {
//         console.log("in 123", currencyHistory);
//         console.log(this)
//
//
//
//     }
// )
//     .catch(err => {
//         console.log(err)
//     })


// runAtStart();

// runAtStartModalWindow()