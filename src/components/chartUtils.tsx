import { tsvParse, csvParse, DSVRowString } from "d3-dsv";
import { timeParse } from "d3-time-format";

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

export function getData() {
  const promiseIntraDayContinuous = fetch(
    "https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/bitfinex_xbtusd_1m.csv"
  )
    .then(response => response.text())
    .then(data => csvParse(data, parseData(parseDateTime)))
    .then(data => {
      data.sort((a: IData, b: IData) => {
        return a.date.valueOf() - b.date.valueOf();
      });
      return data;
    });
  return promiseIntraDayContinuous;
}