import {currentDate, lastCurrencies} from "./index";
import {COLORS_FOR_CURR, SUPPORTED_CURRENCIES} from "./config";
import * as d3 from "./d3.min";
import {convertToChosenForGraph, isCurrentYear} from "./tmp_1";
import {renderBarChart} from "./graphBar";


export function startRenderingLineChart() {
    console.log("in line chart", window.choosenBoxValue, window.currencyHistory, lastCurrencies)
    let data = Object.values(Object.assign({}, window.currencyHistory));
    let dataToSplit = Object.values(Object.assign({}, window.currencyHistory));

    let dataStatic = [];
    let dataMoving = [lastCurrencies];
    let namesXAxis = ["год назад", "сегодня", "через год"];

    for (let i = 0; i < dataToSplit.length; i++) {

        if (isCurrentYear(dataToSplit[i].date, currentDate)) {
            dataStatic.push(dataToSplit[i]);
        }
        else {
            dataMoving.push(dataToSplit[i])
        }
    }

    d3.select(".line-chart__svg").remove();
    d3.select(".line-chart").append("svg").attr("class", "line-chart__svg").attr("width", 270)
        .attr("height", 236);

    let svgLineChart = d3.select(".line-chart__svg"),
        marginLineChart = {top: 5, right: 20, bottom: 60, left: 30},
        widthLineChart = svgLineChart.attr("width") - marginLineChart.left - marginLineChart.right,
        heightLineChart = svgLineChart.attr("height") - marginLineChart.top - marginLineChart.bottom,
        gLineChart = svgLineChart.append("g").attr("transform", "translate(" + marginLineChart.left + ","
            + marginLineChart.top + ")");


    let x = d3.scaleTime().range([1, widthLineChart]);

    let xLabels = d3.scaleBand().domain(namesXAxis)
        .range([0, widthLineChart])
        .paddingInner(0.35);

    let y = d3.scaleLinear().range([heightLineChart, 0]);

    let colorsLineChart = d3.scaleOrdinal(d3.schemeCategory20);

    function make_y_gridlines() {
        return d3.axisLeft(y)
            .ticks(4)
    }

    function make_x_gridlines() {
        return d3.axisBottom(xLabels.paddingInner(0).paddingOuter(0.4))
    }

    let timeParser = d3.timeParse("%Y-%m-%d");

    let focusCurrencies = [];
    let drags = [];
    let draggedFunctions = [];
    let lineMovingItems = [];
    let lineConcatenateItems = [];


    let line = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.currency);
        });

    let currencies = SUPPORTED_CURRENCIES.filter(item => {
        return item !== window.choosenBoxValue && SUPPORTED_CURRENCIES.includes(item)
    }).map(function (currentCurrencyToAssign) {
        return {
            currentCurrency: currentCurrencyToAssign,
            values: data.map(function (d) {
                return {
                    date: timeParser(d.date),
                    currency: convertToChosenForGraph(d,
                        currentCurrencyToAssign, window.choosenBoxValue)
                };
            })
        };
    });

    let currenciesStatic = SUPPORTED_CURRENCIES.filter(item => {
        return item !== window.choosenBoxValue && SUPPORTED_CURRENCIES.includes(item)
    }).map(function (currentCurrencyToAssign) {
        return {
            currentCurrency: currentCurrencyToAssign,
            values: dataStatic.map(function (d) {
                return {
                    date: timeParser(d.date),
                    currency: convertToChosenForGraph(d,
                        currentCurrencyToAssign, window.choosenBoxValue)
                };
            })
        };
    });

    let currenciesMoving = SUPPORTED_CURRENCIES.filter(item => {
        return item !== window.choosenBoxValue && SUPPORTED_CURRENCIES.includes(item)
    }).map(function (currentCurrencyToAssign) {
        return {
            currentCurrency: currentCurrencyToAssign,
            values: dataMoving.map(function (d) {
                return {
                    date: timeParser(d.date),
                    currency: convertToChosenForGraph(d,
                        currentCurrencyToAssign, window.choosenBoxValue),
                    currencyName: currentCurrencyToAssign
                };
            })
        };
    });

    x.domain(d3.extent(data, function (d) {
        return timeParser(d.date);
    }));

    //MinMax
    y.domain([
        d3.min(currencies, function (c) {
            return d3.min(c.values, function (d) {
                return d.currency - 0.1;
            });
        }),
        d3.max(currencies, function (c) {
            return d3.max(c.values, function (d) {
                return d.currency + d.currency / 8;
            });
        })
    ]).nice();

    // Create focus group items and drug functions for each currency
    for (let i = 0; i < SUPPORTED_CURRENCIES.length; i++) {

        focusCurrencies[i] = svgLineChart.append("g")
            .attr("transform", "translate(" + marginLineChart.left + "," + marginLineChart.top + ")");
        lineMovingItems[i] = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.currency);
            });

        lineConcatenateItems[i] = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.currency);
            });

        draggedFunctions[i] = function (d) {
            if (d3.event.y < heightLineChart - 2 && d3.event.y > 2 && y.invert(d3.event.y) > 0) {

                d.currency = y.invert(d3.event.y);
                d3.select(this)
                    .attr('cx', x(d.date))
                    .attr('cy', y(d.currency));
                focusCurrencies[i].select('path').attr('d', lineMovingItems[i]);

                updateCurrency(d);
                renderBarChart(window.currencyHistory);
            }
            // else {
            // if (y.invert(d3.event.y) > 0 && d3.event.y > heightLineChart - 2){
            //
            //     d.currency = y.invert(d3.event.y);
            //     updateCurrency(d);
            //     renderBarChart(currencyHistory);
            //     startRenderingLineChart(currencyHistory)
            // }
            // else if ((y.invert(d3.event.y) <= y.domain()[1]) && d3.event.y < 5&& d3.event.y > 0) {
            //     d.currency = y.invert(d3.event.y);
            //     updateCurrency(d);
            //     renderBarChart(currencyHistory);
            //     startRenderingLineChart(currencyHistory)
            // }
            // }
        }
        ;
        drags[i] = d3.drag()
            .on('start', dragstarted)
            .on('drag', draggedFunctions[i])
            .on('end', dragended);


    }


    colorsLineChart.domain(currencies.map(function (c) {
        return c.currentCurrency;
    }));

    gLineChart.append("g")
        .attr("class", "line-chart__axis-bottom")
        .attr("transform", "translate(0," + (heightLineChart - 1) + ")")
        .call(d3.axisBottom(xLabels))
        .attr("font-size", "11px");


    let currencyLines = gLineChart.selectAll(".currencyLines")
        .data(currenciesStatic)
        .enter().append("g")
        .attr("class", "currencyLines");

    currencyLines.append("path")
        .attr("class", "line-chart__path")
        .attr("d", function (d) {
            return line(d.values);
        })
        .style("stroke", function (d) {
            SUPPORTED_CURRENCIES.filter(item => {
                return item !== window.choosenBoxValue && SUPPORTED_CURRENCIES.includes(item)
            });
            if (SUPPORTED_CURRENCIES.includes(d.currentCurrency)) {
                return COLORS_FOR_CURR[SUPPORTED_CURRENCIES.indexOf(d.currentCurrency)]
            }
            else {
                return colorsLineChart(d.currentCurrency);
            }
        });

    // add line path to points add circles
    for (let i = 0; i < focusCurrencies.length - 1; i++) {

        focusCurrencies[i].append("path")
            .datum(currenciesMoving[i].values)
            .attr("class", "line-chart__moving-lines")
            .attr("fill", "none")
            .style("stroke", function () {
                if (SUPPORTED_CURRENCIES.indexOf(choosenBoxValue) <= i) {
                    return COLORS_FOR_CURR[i + 1]
                }
                else {
                    return COLORS_FOR_CURR[i]
                }
            })
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 2)
            .attr("d", lineMovingItems[i]);

        focusCurrencies[i].selectAll('circle')
            .data(currenciesMoving[i].values)
            .enter()
            .append('circle')
            .attr('r', 3.5)
            .attr('cx', function (d) {
                return x(d.date);
            })
            .attr('cy', function (d) {
                return y(d.currency);
            })
            .style('cursor', 'ns-resize')
            .style('fill', function () {
                if (SUPPORTED_CURRENCIES.indexOf(window.choosenBoxValue) <= i) {
                    return COLORS_FOR_CURR[i + 1]
                }
                else {
                    return COLORS_FOR_CURR[i]
                }
            });

        //Filter first circle so it doesn't drag
        focusCurrencies[i].selectAll('circle').filter(function (item, ind) {
            if (ind !== 0) {
                return this
            }
            else {
                this.remove()
            }
        })
            .call(drags[i]);
    }

    //Add grid
    svgLineChart.append("g")
        .attr("class", "line-chart__grid")
        .attr("transform", "translate(" + marginLineChart.left + "," + (heightLineChart + marginLineChart.top ) + ")")
        .call(make_x_gridlines()
            .tickSize(-heightLineChart)
            .tickFormat("")
        );
    //
    svgLineChart.append("g")
        .attr("class", "line-chart__grid")
        .attr("transform", "translate(" + marginLineChart.left + "," + marginLineChart.top + ")")
        .call(make_y_gridlines()
            .tickSize(-widthLineChart)
        );

    // //Remove zero tick
    svgLineChart.selectAll(".tick")
        .filter(function (d) {
            return d === 0;
        })
        .remove();


    function dragstarted(d) {
        d3.select(this).raise().classed('active', true);

    }

    function dragended(d) {
        d3.select(this).classed('active', false);
    }

    function updateCurrency(currencyItem) {
        for (let i = 0; i < window.currencyHistory.length; i++) {
            if (JSON.stringify(timeParser(window.currencyHistory[i].date)) === JSON.stringify(currencyItem.date)) {
                window.currencyHistory[i][currencyItem.currencyName] = 1 / currencyItem.currency;
            }
        }
        return 1;
    }
}


