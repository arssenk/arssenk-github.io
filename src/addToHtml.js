//
//
// //
// //
// // export function addInputCurrencyForm(curr) {
// //     let sectionForOutputFrom = document.createElement("SECTION");
// //     sectionForOutputFrom.className = "convert-table__input-section";
// //
// //     let imageForOutputFrom = document.createElement("img");
// //     imageForOutputFrom.className = "convert-table__currency-img";
// //     imageForOutputFrom.src = "./img/" + curr + ".svg";
// //     imageForOutputFrom.alt = curr;
// //
// //
// //     let inputForm = document.createElement("INPUT");
// //     inputForm.className = "convert-table__input-exchange";
// //     inputForm.id = "currency_" + (document.getElementsByClassName("convert-table__input-section").length + 1).toString();
// //     inputForm.type = "text";
// //     inputForm.value = "0";
// //
// //     inputForm.onchange = addTo;
// //
// //     sectionForOutputFrom.appendChild(imageForOutputFrom);
// //     sectionForOutputFrom.appendChild(inputForm);
// //
// //     document.getElementsByClassName("convert-table__input-fields")[0].append(sectionForOutputFrom);
// // }
//
// function addOutputCurrencyForm() {
//     let outputElement = document.createElement("OUTPUT");
//     outputElement.className = "convert-table__output-exchange";
//     outputElement.id = "currency_converted_" + (document.getElementsByClassName("convert-table__output-exchange").length + 1).toString();
//     outputElement.innerHTML = 0;
//     document.getElementsByClassName("convert-table__converted-currency")[0].append(outputElement);
// }
//
// // function addPercentageForm() {
// //
// //     let inputForm = document.createElement("INPUT");
// //     inputForm.className = "convert-table__input-percentage-form";
// //     inputForm.id = "input_percentage_" + (document.getElementsByClassName("convert-table__input-percentage-form").length + 1).toString();
// //     inputForm.type = "text";
// //     inputForm.setAttribute("value", "0");
// //
// //     inputForm.onchange = addToPercentage;
// //     document.getElementsByClassName("convert-table__input-percentage")[0].append(inputForm);
// //
// // }
// function addOptionToBox(curr) {
//     let optionVal = document.createElement("OPTION");
//     optionVal.value = hiddenCurrencies[hiddenCurrenciesTXT.indexOf(curr)];
//     optionVal.innerHTML = curr;
//     document.getElementById("currency-choose-box-id").append(optionVal);
// }
//
// function generateColor() {
//     let letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }
//
//
// function addDefaultValuesAtAddingNewForm() {
//     valueCurrencyArray.push(0);
//     valuePercentageArray.push(0);
// }
//
