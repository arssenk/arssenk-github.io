/**
 * Created by arsen on 29.12.18.
 */
import {addInputForms, addUpdateFunctionChooseBox, updateStatus} from "./helperFuncTmp";
import {getCurrencyDataAlt} from "./apiCall";
import {addPredictionPoints} from "./apiProcessing";
import {disableForms} from "./disableForms";
import {runAtStartModalWindow} from "./currency-modal-window";


export let CURRENT_DATE;

export let CURRENCY_HISTORY;
export let LAST_CURRENCIES = [];


addInputForms();

let currencyData = getCurrencyDataAlt();

currencyData.then(resp => {
    LAST_CURRENCIES = resp[resp.length - 1];
    CURRENT_DATE = LAST_CURRENCIES.date;
    addPredictionPoints(resp, CURRENT_DATE, LAST_CURRENCIES);
    window.currencyHistory = resp;
    disableForms(0);
    addUpdateFunctionChooseBox();

    updateStatus();
});

runAtStartModalWindow();
