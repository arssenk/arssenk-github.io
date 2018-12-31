function disableInputCurrency(disableNotch) {
    for (let i = 0; i < document.getElementsByClassName("convert-table__input-exchange").length; i++) {
        document.getElementsByClassName("convert-table__input-exchange")[i].disabled = !!disableNotch;
    }
}

function disableInputPercentage(disableNotch) {
    for (let i = 0; i < document.getElementsByClassName("convert-table__input-percentage-form").length; i++) {
        document.getElementsByClassName("convert-table__input-percentage-form")[i].disabled = !!disableNotch;
    }
}

function disableCheckBox(notch) {
    document.getElementById("percentage_checkbox").disabled = !!notch;
}

function disableSelectBox(notch) {
    if (notch) {
        document.getElementById("currency-choose-box-id").setAttribute("disabled", "")
    }
    else {
        document.getElementById("currency-choose-box-id").removeAttribute("disabled")
    }
}

function disableButton(notch) {
    document.getElementsByClassName("convert-table__add-currency-button")[0].disabled = !!notch;
    if (notch) {
        document.getElementsByClassName("convert-table__add-currency-button")[0].style["background-color"] = "grey";
    }
    else {
        document.getElementsByClassName("convert-table__add-currency-button")[0].style["background-color"] = "#0080ff";
    }
}


export function disableForms(disableNotch) {
    disableInputCurrency(disableNotch);
    disableButton(disableNotch);
    disableCheckBox(disableNotch);
    disableSelectBox(disableNotch)
}