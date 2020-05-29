/**
 * Chart utilities:
 * This handles the utility function for a chart
 * Primarily, it retrieves and handles the data from the API
 */
import {  csvParse,DSVParsedArray } from "d3-dsv";
import { timeParse } from "d3-time-format";
import {DataExceeded} from "./types";

interface IData {
  date: Date;
  volume: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

function parseData(parse: any) {
  return function(d: any) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}


const parseDateTime = timeParse("%Y-%m-%d %H:%M:%S");

interface DataStruct{
  [date: string]: {};
}

/**
 * @description Scrubs the dataset for unnecessary data
 * @param data : data to trim to only show today's date
 * @returns the scrubbed data
 */
function trimData(data: DataStruct) {
  var result : DataStruct  = {}
  var firstDate = parseDateTime(Object.keys(data)[0])?.getDate();
  Object.keys(data).map((date: string) => {
    var rawDate = parseDateTime(date);
    //We only show the most recent data, 1 day of data at most.
    if(firstDate == rawDate?.getDate()){
      result[date] = data[date];
    }
  });
  return result;
}


function convertJsonToCsv(data: string) {
  var test = JSON.parse(data);
  var testTime = test["Time Series (5min)"]; 
  testTime = trimData(testTime);
  var dates = Object.keys(testTime);
  var headers: string[] = ["open", "high", "low", "close", "volume", "date"];
  let csv = Object.keys(testTime).map(
    date =>
      Object.keys(testTime[date])
        .map(innerKey => testTime[date][innerKey])
        .join(",")
  );
  csv = csv.map((elem, i) => elem + "," + dates[i]);
  csv.unshift(headers.join(","));
  var csvOut = csv.join("\r\n");
  return csvOut;
}

/**
 * @description This function retrieves and converts the data from the API into CSV
 * @param tag the stock symbol
 */
export function getData(tag: string) {
  const promiseIntraDayContinuous = fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${tag}&interval=5min&apikey=IUDORZ4BGIONCWPR`
  )
    .then(response => response.text())
    .then(data => {
      //special case if we exceed our 5 per minute api calls
      if(data.includes("Thank you") ){
        return {success: false, type: "exhausted"} 
      }
      // special case if the call was invalid, i.e invalid
      else if(data.includes("Invalid API call")){
        return {success: false, type: "error"}
      }
      var csv = convertJsonToCsv(data);
      var parsedCsv = csvParse(csv, parseData(parseDateTime));
      // special case for empty data
      if(parsedCsv.length <= 6){
        return {success: false, type: "nodata"}
      }
      return parsedCsv;
    })
    .then(data => {
      if((data as DataExceeded).success !== undefined){
        return data
      }
      (data as DSVParsedArray<any>).sort((a: IData, b: IData) => {
        return a.date.valueOf() - b.date.valueOf();
      });
      return data;
    });
  return promiseIntraDayContinuous;
}
