/**
 * Created by arsen on 29.12.18.
 */
import {addInputForms, addUpdateFunctionChooseBox, updateStatus} from "./helperFuncTmp";
import {addPredictionPoints} from "./apiProcessing";
import {disableForms} from "./disableForms";
import {getCurrencyData} from "./apiCall";
import {runAtStartModalWindow} from "./currency-modal-window";


export let totalConverted = 0;

export let currentDate;

export let currencyHistory;
export let lastCurrencies = [];


addInputForms();

// // TODO window,choset to getter
// let chooseBox = document.getElementById("currency-choose-box-id");
// window.choosenBoxValue = chooseBox.options[chooseBox.selectedIndex].value;

let currencyData = getCurrencyData();

currencyData.then(resp => {
    lastCurrencies = resp[resp.length - 1];
    currentDate = lastCurrencies.date;
    addPredictionPoints(resp, currentDate, lastCurrencies);
    window.currencyHistory = resp;
    disableForms(0);
    addUpdateFunctionChooseBox();

    updateStatus();
});

runAtStartModalWindow();