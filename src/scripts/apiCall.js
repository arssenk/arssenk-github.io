/**
 * Created by arsen on 29.12.18.
 */
import {disableForms} from "./disableForms";
import {generateYearBack, processDataApi, rebaseDate} from "./apiProcessing";
import {convertToYYMMDDFormat} from "./converters";


// export function getCurrencyData() {
//     disableForms(1);
//     const url = "https://openexchangerates.org/api/";
//     const userKey = "50390a5304474279b277dfd95509734b";
//
//     let getLatestData = fetch(url + "latest.json?app_id=" + userKey).then(resp => resp.json())
//         .then(resp => {
//             let dateTimastampLatest = new Date(resp.timestamp * 1000);
//             resp.date = convertToYYMMDDFormat(dateTimastampLatest.getFullYear(),
//                 dateTimastampLatest.getMonth() + 1, dateTimastampLatest.getDate());
//             return generateYearBack(resp.date, url, userKey);
//         });
//
//     let dataCurrencyYearBack = getLatestData.then(dates => {
//             return Promise.all(dates.map(url => {
//                 return fetch(url)
//             }))
//         })
//             .then(resp => {
//                 return Promise.all(resp.map(r => r.json()
//                 ))
//             })
//             .then(resp => {
//                 return Promise.all(resp.map(r => {
//                     let dateTimestamp = new Date(r.timestamp * 1000);
//                     r.date = convertToYYMMDDFormat(dateTimestamp.getFullYear(), dateTimestamp.getMonth() + 1, dateTimestamp.getDate());
//                     // return processDataApi(r)
//                     r = processDataApi(r);
//                     rebaseDate([r]);
//                     return r;
//                 }))
//             })
//     ;
//
//     return dataCurrencyYearBack
// }


export function getCurrencyDataAlt() {
    disableForms(1);
    let [startDate, endDate] = getStartEndDate();

    const url = "https://api.exchangeratesapi.io/history?start_at=";

    let getLatestData = fetch(url + startDate + "&end_at=" + endDate).then(resp => resp.json()
    ).then(resp => {
        let base = resp.base;
        let result = [];

        for (let date in resp.rates) {
            if (resp.rates.hasOwnProperty(date)) {
                let r = resp.rates[date];
                r.date = date;
                r[base] = 1;
                r = processDataApi(r);
                rebaseDate([r]);
                result.push(r)
            }
        }
        result.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        });
        return result;
    });

    return getLatestData
}


function getStartEndDate() {
    let date = new Date();
    let resultStartDate = convertToYYMMDDFormat(date.getFullYear() - 1, date.getMonth() + 1, date.getDate());
    let resultEndDate = convertToYYMMDDFormat(date.getFullYear(), date.getMonth() + 1, date.getDate());
    return [resultStartDate, resultEndDate]
}