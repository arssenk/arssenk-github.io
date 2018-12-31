// // Get the modal
// function runAtStartModalWindow() {
//     let modal = document.getElementById('currency-modal');
//
// // Get the button that opens the modal
//     let currencyButton = document.getElementById("add-currency-btn");
//
// // Get the <span> element that closes the modal
//     let closeButton = document.getElementsByClassName("modal__close")[0];
//
// // When the user clicks on the button, open the modal
//     currencyButton.onclick = function () {
//         modal.style.display = "block";
//     };
//
// // When the user clicks on (x), close the modal
//     closeButton.onclick = function () {
//         modal.style.display = "none";
//     };
//
// // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function (event) {
//         if (event.target === modal) {
//             modal.style.display = "none";
//         }
//     };
//
//     addOptionsToModalWindow();
// }
//
//
// function addNewCurrency(curr) {
//     if (HIDDEN_CURRENCIES.length !== 0) {
//         let currTxt = HIDDEN_CURRENCIES_TXT[HIDDEN_CURRENCIES.indexOf(curr)];
//
//         addColorToSupportedColors();
//         addInputCurrencyForm(curr);
//         addOutputCurrencyForm();
//         addPercentageForm();
//         addOptionToBox(currTxt);
//
//         SUPPORTED_CURRENCIES.push(curr);
//         SUPPORTED_CURRENCIES_TXT.push(currTxt);
//
//         HIDDEN_CURRENCIES = HIDDEN_CURRENCIES.filter(function (item) {
//             return item !== curr
//         });
//
//         HIDDEN_CURRENCIES_TXT = HIDDEN_CURRENCIES_TXT.filter(function (item) {
//             return item !== currTxt
//         });
//
//         addDefaultValuesAtAddingNewForm();
//         updateStatus();
//     }
//     if (HIDDEN_CURRENCIES.length === 0) {
//         disableButton(1)
//     }
// }
//
//
// function addColorToSupportedColors() {
//     let color = generateColor();
//     while (COLORS_FOR_CURR.includes(color)) {
//         color = generateColor();
//     }
//     COLORS_FOR_CURR.push(color);
// }