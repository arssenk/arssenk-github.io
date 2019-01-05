import {inputHandler, percentageInputHandler, updateStatus} from "./helperFuncTmp";
import {
    DEFAULT_CURRENCIES_PERCENTAGE,
    DEFAULT_CURRENCIES_VALUES,
    SUPPORTED_CURRENCIES_ALL,
    SUPPORTED_CURRENCIES_ALL_TXT, COLORS_FOR_CURR
} from "./config";
import {addNewCurrency} from "./currency-modal-window";


export function addInputCurrencyForm(curr) {
    let sectionForOutputFrom = document.createElement("SECTION");
    sectionForOutputFrom.className = "convert-table__input-section";

    let imageForOutputFrom = document.createElement("img");
    imageForOutputFrom.className = "convert-table__currency-img";
    imageForOutputFrom.src = "./src/img/" + curr + ".svg";
    imageForOutputFrom.alt = curr;


    let inputForm = document.createElement("INPUT");
    inputForm.className = "convert-table__input-exchange";
    inputForm.id = "currency_" + (document.getElementsByClassName("convert-table__input-section").length + 1).toString();
    inputForm.type = "text";
    inputForm.value = DEFAULT_CURRENCIES_VALUES[SUPPORTED_CURRENCIES_ALL.indexOf(curr)];

    inputForm.onchange = function () {
        inputHandler();
    };

    sectionForOutputFrom.appendChild(imageForOutputFrom);
    sectionForOutputFrom.appendChild(inputForm);

    document.getElementsByClassName("convert-table__input-fields")[0].append(sectionForOutputFrom);
}
export function addPercentageCheckbox() {

    let percentageCheckbox = document.createElement("INPUT");
    percentageCheckbox.id = "percentage_checkbox";
    percentageCheckbox.type = "checkbox";

    percentageCheckbox.onchange = function () {
        percentageInputHandler();
    };

    document.getElementsByClassName("converter-header__container")[1].prepend(percentageCheckbox);
}

export function addCurrencySelect() {

    let currencySelectLabel = document.createElement("LABEL");
    currencySelectLabel.for = "currency-choose-box-id";

    let currencySelect = document.createElement("SELECT");
    currencySelect.className = "currency-choose-box";
    currencySelect.id = "currency-choose-box-id";

    currencySelect.onchange = function () {
        updateStatus();
    };

    document.getElementsByClassName("converter-header__currency-choose")[0].append(currencySelectLabel);
    document.getElementsByClassName("converter-header__currency-choose")[0].append(currencySelect);

}


export function addOptionToSelectCurrency(curr) {
    let optionSelect = document.createElement("OPTION");

    optionSelect.value = curr;
    optionSelect.text = SUPPORTED_CURRENCIES_ALL_TXT[SUPPORTED_CURRENCIES_ALL.indexOf(curr)];

    document.getElementsByClassName("currency-choose-box")[0].append(optionSelect);
}

export function addPercentageForm(curr) {

    let inputForm = document.createElement("INPUT");
    inputForm.className = "convert-table__input-percentage-form";
    inputForm.id = "input_percentage_" + (document.getElementsByClassName("convert-table__input-percentage-form").length + 1).toString();
    inputForm.type = "text";
    inputForm.setAttribute("value", DEFAULT_CURRENCIES_PERCENTAGE[SUPPORTED_CURRENCIES_ALL.indexOf(curr)]);

    inputForm.onchange = function () {
        percentageInputHandler();
    };
    document.getElementsByClassName("convert-table__input-percentage")[0].append(inputForm);

}


export function addOutputCurrencyForm(curr) {
    let outputForm = document.createElement("OUTPUT");
    outputForm.className = "convert-table__output-exchange";
    outputForm.id = "currency_converted_" +
        (document.getElementsByClassName("convert-table__output-exchange").length + 1).toString();

    document.getElementsByClassName("convert-table__converted-currency")[0].append(outputForm);

}

export function addOptionsToModalWindow() {
    let placeToAdd = document.getElementsByClassName("modal_container")[0];
    for (let currCurrencyIndex = 0; currCurrencyIndex < window.HIDDEN_CURRENCIES.length; currCurrencyIndex++) {
        let currencyAddButton = document.createElement("BUTTON");
        currencyAddButton.className = "modal__currency-button";
        let spanTagInButton = document.createElement("SPAN");
        let spanValue = document.createTextNode(window.HIDDEN_CURRENCIES_TXT[currCurrencyIndex]);
        spanTagInButton.appendChild(spanValue);
        currencyAddButton.appendChild(spanValue);
        currencyAddButton.onclick = function () {
            addNewCurrency(window.HIDDEN_CURRENCIES[window.HIDDEN_CURRENCIES_TXT.indexOf(this.childNodes[0].data)]);
            this.remove()
        };

        placeToAdd.append(currencyAddButton);
    }
}
