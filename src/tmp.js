/**
 * Created by arsen on 29.12.18.
 */
import {disableForms} from "./disableForms";
import {
    addPredictionPoints, convertToYYMMDDFormat, generateYearBack, processDataApi,
    rebaseDate
} from "./apiProcessing";



export function a() {
    disableForms(1);
    const url = "https://openexchangerates.org/api/";
    const userKey = "50390a5304474279b277dfd95509734b";

    let getLatestData = fetch(url + "latest.json?app_id=" + userKey).then(resp => resp.json())
        .then(resp => {
            let dateTimastampLatest = new Date(resp.timestamp * 1000);
            resp.date = convertToYYMMDDFormat(dateTimastampLatest.getFullYear(),
                dateTimastampLatest.getMonth() + 1, dateTimastampLatest.getDate());
            return generateYearBack(resp.date, url, userKey);
        });

    let dataCurrencyYearBack = getLatestData.then(dates => {
        return Promise.all(dates.map(url => {
            return fetch(url)
        }))
    })
        .then(resp => {
            return Promise.all(resp.map(r => r.json()
            ))
        })
        .then(resp => {
            return Promise.all(resp.map(r => {
                let dateTimestamp = new Date(r.timestamp * 1000);
                r.date = convertToYYMMDDFormat(dateTimestamp.getFullYear(), dateTimestamp.getMonth() + 1, dateTimestamp.getDate());
                // return processDataApi(r)
                r = processDataApi(r);
                rebaseDate([r]);
                return r;
            }))
        })
        ;

    return dataCurrencyYearBack
}
