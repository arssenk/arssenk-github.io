import {COLORS_FOR_CURR, colorsForPercentage} from "./config";
import {currentDate} from "./index";
import * as d3 from "d3";
import {getChosenCurrency, getInputValues, getPercentageValues} from "./getters";
import {convertComplexPercentage, convertToChosenCurrencyWithDate} from "./converters";
import {isCurrentYear} from "./helperFuncTmp";

export function renderBarChart(data_1) {
    let data = createDeepCopy(data_1);
    let dataFourMonth = [];
    // quarterMonthCopy = quarterMonth.slice();
    let namesXAxisBar = ["сегодня", "через год"];


    // Current year chosen month
    for (let i = 0; i < data.length; i++) {
        if (!isCurrentYear(data[i].date, currentDate)) {
            dataFourMonth.push(data[i])
        }
    }
    d3.select(".bar-chart__svg").remove();
    d3.select(".bar-chart").append("svg").attr("class", "bar-chart__svg")
        .attr("width", 300).attr("height", 225);

    let barChart = d3.select(".bar-chart__svg"),
        marginBar = {top: 21, right: 21, bottom: 25, left: 53},
        widthBar = +barChart.attr("width") - marginBar.left - marginBar.right,
        heightBar = +barChart.attr("height") - marginBar.top - marginBar.bottom,
        gBar = barChart.append("g").attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")");

    let xBar = d3.scaleBand()
        .rangeRound([0, widthBar])
        .paddingInner(0.02);

    let xLabelsBarChart = d3.scaleOrdinal().domain(namesXAxisBar)
        .range([widthBar / 8 - 2, 7 * widthBar / 8 - 2]);

    let yBar = d3.scaleLinear()
        .rangeRound([heightBar, 0]);

    let colors = d3.scaleOrdinal(d3.schemeCategory20);

    let valueCurrencyArray = getInputValues();
    let valuePercentageArray = getPercentageValues();
    //update values
    for (let i = 0; i < dataFourMonth.length; i++) {

        //Total value of bar
        let totalValue = 0;
        for (let currencyIndex = 0; currencyIndex < SUPPORTED_CURRENCIES.length; currencyIndex++) {

            //Convert to chosen currency
            dataFourMonth[i][SUPPORTED_CURRENCIES[currencyIndex]] =
                +convertToChosenCurrencyWithDate(valueCurrencyArray[currencyIndex],
                    SUPPORTED_CURRENCIES[currencyIndex], getChosenCurrency(), dataFourMonth[i].date);

            totalValue += dataFourMonth[i][SUPPORTED_CURRENCIES[currencyIndex]];

            if (document.getElementById("percentage_checkbox").checked) {

                //Calculate complex percentage
                dataFourMonth[i][SUPPORTED_CURRENCIES[currencyIndex] + "_percentage"] =
                    convertComplexPercentage(valueCurrencyArray[currencyIndex],
                        valuePercentageArray[currencyIndex], i + 1);

                //Convert to chosen currency
                dataFourMonth[i][SUPPORTED_CURRENCIES[currencyIndex] + "_percentage"] =
                    +convertToChosenCurrencyWithDate(dataFourMonth[i][SUPPORTED_CURRENCIES[currencyIndex] + "_percentage"],
                        SUPPORTED_CURRENCIES[currencyIndex], getChosenCurrency(), dataFourMonth[i].date);

                totalValue += dataFourMonth[i][SUPPORTED_CURRENCIES[currencyIndex] + "_percentage"]
            }
        }

        dataFourMonth[i].total = totalValue;
    }

    let keys = [];

    if (document.getElementById("percentage_checkbox").checked) {

        //Create "EUR", "EUR_percentage", ... keys
        for (let i = 0; i < SUPPORTED_CURRENCIES.length; i++) {
            keys.push(SUPPORTED_CURRENCIES[i]);
            keys.push(SUPPORTED_CURRENCIES[i] + "_percentage")
        }
    }
    else {
        keys = SUPPORTED_CURRENCIES;
    }
    xBar.domain(dataFourMonth.map(function (d) {
        return d.date;
    }));
    yBar.domain([0, d3.max(dataFourMonth, function (d) {
        return d.total * 1.6;
    })]).nice();

    colors.domain(keys);

    gBar.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(dataFourMonth))
        .enter().append("g")
        .attr("fill", function (d) {
            if (SUPPORTED_CURRENCIES.includes(d.key)) {
                return COLORS_FOR_CURR[SUPPORTED_CURRENCIES.indexOf(d.key)]
            }
            else if (d.key.split("_").length > 1 && d.key.split("_")[1] === "percentage") {
                return colorsForPercentage[SUPPORTED_CURRENCIES.indexOf(d.key.split("_")[0])]
            }
            else {
                return colors(d.key);
            }
        })
        .selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return xBar(d.data.date)
        })
        .attr("y", function (d) {
            return yBar(d[1]);
        })
        .attr("height", function (d) {
            return yBar(d[0]) - yBar(d[1]);
        })
        .attr("width", xBar.bandwidth());

    gBar.append("g")
        .attr("class", "bar-chart__axis-bottom")
        .attr("transform", "translate(0," + heightBar + ")")
        .call(d3.axisBottom(xLabelsBarChart))
        .attr("font-size", "12px");

    gBar.append("g")
        .attr("class", "bar-chart__axis-left")
        .call(d3.axisLeft(yBar).ticks(4)
            .tickFormat(function (d) {
                let tickValue = d3.format(".0s")(d);
                if (this.parentNode.nextSibling) {
                    return tickValue
                }
                else {
                    return tickValue + " " + SUPPORTED_CURRENCIES_TXT[SUPPORTED_CURRENCIES.indexOf(getChosenCurrency())]
                }
            }));

    updateTotalValuesGraph2(Math.round(dataFourMonth[0]["total"]),
        Math.round(dataFourMonth[dataFourMonth.length - 1]["total"])
    );

    //Remove zero tick
    barChart.selectAll(".tick")
        .filter(function (d) {
            return d === 0;
        })
        .remove();
}

function updateTotalValuesGraph2(val1, val2) {
    document.getElementById("graph-2-total-" + 1).value =
        val1 + " " + SUPPORTED_CURRENCIES_TXT[SUPPORTED_CURRENCIES.indexOf(getChosenCurrency())];

    document.getElementById("graph-2-total-" + 2).value =
        val2 + " " + SUPPORTED_CURRENCIES_TXT[SUPPORTED_CURRENCIES.indexOf(getChosenCurrency())];
}

function createDeepCopy(o) {
    let r = [];
    for (let i = 0; i < o.length; i++) {
        r.push(Object.assign({}, o[i]))
    }
    return Object.values(r)
}
