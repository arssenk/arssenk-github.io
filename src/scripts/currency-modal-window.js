// Get the modal
import {
    addInputCurrencyForm, addOptionsToModalWindow, addOptionToSelectCurrency, addOutputCurrencyForm,
    addPercentageForm
} from "./addToHTMLtmp";
import {

    SUPPORTED_CURRENCIES_ALL_TXT, SUPPORTED_CURRENCIES_ALL,COLORS_FOR_CURR
} from "./config";
import {disableButton} from "./disableForms";
import {updateStatus} from "./helperFuncTmp";
import {totalConverted, valueCurrencyArray, valuePercentageArray} from "./index";

export function runAtStartModalWindow() {
    let modal = document.getElementById('currency-modal');

// Get the button that opens the modal
    let currencyButton = document.getElementById("add-currency-btn");

// Get the <span> element that closes the modal
    let closeButton = document.getElementsByClassName("modal__close")[0];

// When the user clicks on the button, open the modal
    currencyButton.onclick = function () {
        modal.style.display = "block";
    };

// When the user clicks on (x), close the modal
    closeButton.onclick = function () {
        modal.style.display = "none";
    };

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    addOptionsToModalWindow();
}


export function addNewCurrency(curr) {
    if (window.HIDDEN_CURRENCIES.length !== 0) {

        addColorToSupportedColors();
        addInputCurrencyForm(curr);
        addOutputCurrencyForm(curr);
        addPercentageForm(curr);
        addOptionToSelectCurrency(curr);

        window.SUPPORTED_CURRENCIES.push(curr);
        window.SUPPORTED_CURRENCIES_TXT.push(SUPPORTED_CURRENCIES_ALL_TXT[SUPPORTED_CURRENCIES_ALL.indexOf(curr)]);

        window.HIDDEN_CURRENCIES = window.HIDDEN_CURRENCIES.filter(function (item) {
            return item !== curr
        });

        window.HIDDEN_CURRENCIES_TXT = window.HIDDEN_CURRENCIES_TXT.filter(function (item) {
            return item !== SUPPORTED_CURRENCIES_ALL_TXT[SUPPORTED_CURRENCIES_ALL.indexOf(curr)]
        });

        updateStatus();
    }
    if (window.HIDDEN_CURRENCIES.length === 0) {
        disableButton(1)
    }
}


function addColorToSupportedColors() {
    let color = generateColor();
    while (COLORS_FOR_CURR.includes(color)) {
        color = generateColor();
    }
    COLORS_FOR_CURR.push(color);
}

function generateColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
