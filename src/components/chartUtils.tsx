import { tsvParse, csvParse, DSVRowString } from "d3-dsv";
import { timeParse } from "d3-time-format";
import { keys } from "@material-ui/core/styles/createBreakpoints";

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

var testData = JSON.stringify({
  "Meta Data": {
    "1. Information":
      "Intraday (5min) open, high, low, close prices and volume",
    "2. Symbol": "IBM",
    "3. Last Refreshed": "2020-05-07 10:25:00",
    "4. Interval": "5min",
    "5. Output Size": "Compact",
    "6. Time Zone": "US/Eastern"
  },
  "Time Series (5min)": {
    "2020-05-06 16:00:00": {
      "1. open": "123.3000",
      "2. high": "123.3800",
      "3. low": "123.1300",
      "4. close": "123.1600",
      "5. volume": "146841"
    },
    "2020-05-06 15:55:00": {
      "1. open": "122.8800",
      "2. high": "123.3750",
      "3. low": "122.8800",
      "4. close": "123.2950",
      "5. volume": "138263"
    },
    "2020-05-06 15:50:00": {
      "1. open": "123.3100",
      "2. high": "123.3100",
      "3. low": "122.9000",
      "4. close": "122.9000",
      "5. volume": "97965"
    },
    "2020-05-06 15:45:00": {
      "1. open": "123.3800",
      "2. high": "123.4100",
      "3. low": "123.0800",
      "4. close": "123.3150",
      "5. volume": "60431"
    },
    "2020-05-06 15:40:00": {
      "1. open": "123.5800",
      "2. high": "123.6500",
      "3. low": "123.2950",
      "4. close": "123.3600",
      "5. volume": "54354"
    },
    "2020-05-06 15:35:00": {
      "1. open": "123.7100",
      "2. high": "123.7500",
      "3. low": "123.5500",
      "4. close": "123.5800",
      "5. volume": "95987"
    },
    "2020-05-06 15:30:00": {
      "1. open": "123.7500",
      "2. high": "123.8200",
      "3. low": "123.6700",
      "4. close": "123.7400",
      "5. volume": "42763"
    },
    "2020-05-06 15:25:00": {
      "1. open": "123.8600",
      "2. high": "123.9453",
      "3. low": "123.6950",
      "4. close": "123.7300",
      "5. volume": "42034"
    },
    "2020-05-06 15:20:00": {
      "1. open": "123.7400",
      "2. high": "123.8650",
      "3. low": "123.6600",
      "4. close": "123.8597",
      "5. volume": "25455"
    },
    "2020-05-06 15:15:00": {
      "1. open": "123.7400",
      "2. high": "123.8100",
      "3. low": "123.6600",
      "4. close": "123.7577",
      "5. volume": "39719"
    },
    "2020-05-06 15:10:00": {
      "1. open": "123.5600",
      "2. high": "123.8039",
      "3. low": "123.5600",
      "4. close": "123.7690",
      "5. volume": "30470"
    },
    "2020-05-06 15:05:00": {
      "1. open": "123.5750",
      "2. high": "123.6300",
      "3. low": "123.3700",
      "4. close": "123.5500",
      "5. volume": "29847"
    },
    "2020-05-06 15:00:00": {
      "1. open": "123.7300",
      "2. high": "123.7800",
      "3. low": "123.5600",
      "4. close": "123.5700",
      "5. volume": "25111"
    },
    "2020-05-06 14:55:00": {
      "1. open": "123.6200",
      "2. high": "123.7650",
      "3. low": "123.6000",
      "4. close": "123.7301",
      "5. volume": "29352"
    },
    "2020-05-06 14:50:00": {
      "1. open": "123.5000",
      "2. high": "123.6400",
      "3. low": "123.4660",
      "4. close": "123.6299",
      "5. volume": "21822"
    },
    "2020-05-06 14:45:00": {
      "1. open": "123.3650",
      "2. high": "123.5200",
      "3. low": "123.2500",
      "4. close": "123.5144",
      "5. volume": "27196"
    },
    "2020-05-06 14:40:00": {
      "1. open": "123.3000",
      "2. high": "123.4200",
      "3. low": "123.2100",
      "4. close": "123.3600",
      "5. volume": "20384"
    },
    "2020-05-06 14:35:00": {
      "1. open": "123.1300",
      "2. high": "123.3307",
      "3. low": "122.9900",
      "4. close": "123.2800",
      "5. volume": "26298"
    },
    "2020-05-06 14:30:00": {
      "1. open": "123.3750",
      "2. high": "123.4350",
      "3. low": "123.1200",
      "4. close": "123.1200",
      "5. volume": "19330"
    },
    "2020-05-06 14:25:00": {
      "1. open": "123.3450",
      "2. high": "123.3900",
      "3. low": "123.2500",
      "4. close": "123.3800",
      "5. volume": "15807"
    },
    "2020-05-06 14:20:00": {
      "1. open": "123.2084",
      "2. high": "123.3400",
      "3. low": "123.2000",
      "4. close": "123.3000",
      "5. volume": "22434"
    },
    "2020-05-06 14:15:00": {
      "1. open": "123.4000",
      "2. high": "123.4600",
      "3. low": "123.1200",
      "4. close": "123.2000",
      "5. volume": "21844"
    },
    "2020-05-06 14:10:00": {
      "1. open": "123.3400",
      "2. high": "123.4800",
      "3. low": "123.3000",
      "4. close": "123.3999",
      "5. volume": "41996"
    },
    "2020-05-06 14:05:00": {
      "1. open": "123.5050",
      "2. high": "123.5100",
      "3. low": "123.2300",
      "4. close": "123.3600",
      "5. volume": "22902"
    },
    "2020-05-06 14:00:00": {
      "1. open": "123.6900",
      "2. high": "123.7000",
      "3. low": "123.4900",
      "4. close": "123.5000",
      "5. volume": "15659"
    },
    "2020-05-06 13:55:00": {
      "1. open": "123.7300",
      "2. high": "123.7600",
      "3. low": "123.6600",
      "4. close": "123.6801",
      "5. volume": "15282"
    },
    "2020-05-06 13:50:00": {
      "1. open": "123.7100",
      "2. high": "123.8600",
      "3. low": "123.7100",
      "4. close": "123.7200",
      "5. volume": "21198"
    },
    "2020-05-06 13:45:00": {
      "1. open": "123.6600",
      "2. high": "123.7400",
      "3. low": "123.5600",
      "4. close": "123.6850",
      "5. volume": "21114"
    },
    "2020-05-06 13:40:00": {
      "1. open": "123.6400",
      "2. high": "123.7500",
      "3. low": "123.6150",
      "4. close": "123.6800",
      "5. volume": "38663"
    },
    "2020-05-06 13:35:00": {
      "1. open": "123.5600",
      "2. high": "123.7600",
      "3. low": "123.5400",
      "4. close": "123.6289",
      "5. volume": "18361"
    },
    "2020-05-06 13:30:00": {
      "1. open": "123.5100",
      "2. high": "123.6100",
      "3. low": "123.3800",
      "4. close": "123.5700",
      "5. volume": "13717"
    },
    "2020-05-06 13:25:00": {
      "1. open": "123.6400",
      "2. high": "123.6900",
      "3. low": "123.3300",
      "4. close": "123.5000",
      "5. volume": "18670"
    },
    "2020-05-06 13:20:00": {
      "1. open": "123.6200",
      "2. high": "123.6700",
      "3. low": "123.5100",
      "4. close": "123.6500",
      "5. volume": "10259"
    },
    "2020-05-06 13:15:00": {
      "1. open": "123.5150",
      "2. high": "123.5900",
      "3. low": "123.3900",
      "4. close": "123.5900",
      "5. volume": "24522"
    },
    "2020-05-06 13:10:00": {
      "1. open": "123.4100",
      "2. high": "123.5500",
      "3. low": "123.3600",
      "4. close": "123.5133",
      "5. volume": "45579"
    },
    "2020-05-06 13:05:00": {
      "1. open": "123.5000",
      "2. high": "123.5200",
      "3. low": "123.3250",
      "4. close": "123.4227",
      "5. volume": "17197"
    },
    "2020-05-06 13:00:00": {
      "1. open": "123.5600",
      "2. high": "123.6400",
      "3. low": "123.4450",
      "4. close": "123.4800",
      "5. volume": "26677"
    },
    "2020-05-06 12:55:00": {
      "1. open": "123.5700",
      "2. high": "123.6600",
      "3. low": "123.5600",
      "4. close": "123.5900",
      "5. volume": "41757"
    },
    "2020-05-06 12:50:00": {
      "1. open": "123.4024",
      "2. high": "123.6277",
      "3. low": "123.4024",
      "4. close": "123.5800",
      "5. volume": "14551"
    },
    "2020-05-06 12:45:00": {
      "1. open": "123.5800",
      "2. high": "123.5800",
      "3. low": "123.3500",
      "4. close": "123.4050",
      "5. volume": "12130"
    },
    "2020-05-06 12:40:00": {
      "1. open": "123.5300",
      "2. high": "123.6000",
      "3. low": "123.4200",
      "4. close": "123.5600",
      "5. volume": "16809"
    },
    "2020-05-06 12:35:00": {
      "1. open": "123.5600",
      "2. high": "123.6000",
      "3. low": "123.4500",
      "4. close": "123.5200",
      "5. volume": "13213"
    },
    "2020-05-06 12:30:00": {
      "1. open": "123.5700",
      "2. high": "123.6200",
      "3. low": "123.4200",
      "4. close": "123.5510",
      "5. volume": "22409"
    },
    "2020-05-06 12:25:00": {
      "1. open": "123.5700",
      "2. high": "123.5700",
      "3. low": "123.3600",
      "4. close": "123.5448",
      "5. volume": "25462"
    },
    "2020-05-06 12:20:00": {
      "1. open": "123.2300",
      "2. high": "123.6000",
      "3. low": "123.2000",
      "4. close": "123.5500",
      "5. volume": "60937"
    },
    "2020-05-06 12:15:00": {
      "1. open": "123.1700",
      "2. high": "123.2638",
      "3. low": "123.1117",
      "4. close": "123.2300",
      "5. volume": "25166"
    },
    "2020-05-06 12:10:00": {
      "1. open": "123.1200",
      "2. high": "123.2700",
      "3. low": "122.9900",
      "4. close": "123.1252",
      "5. volume": "32685"
    },
    "2020-05-06 12:05:00": {
      "1. open": "122.8300",
      "2. high": "123.1880",
      "3. low": "122.8100",
      "4. close": "123.1300",
      "5. volume": "37829"
    },
    "2020-05-06 12:00:00": {
      "1. open": "122.7900",
      "2. high": "122.8800",
      "3. low": "122.7500",
      "4. close": "122.8300",
      "5. volume": "23920"
    },
    "2020-05-06 11:55:00": {
      "1. open": "122.9600",
      "2. high": "122.9600",
      "3. low": "122.7000",
      "4. close": "122.8200",
      "5. volume": "31836"
    },
    "2020-05-06 11:50:00": {
      "1. open": "122.8900",
      "2. high": "123.0500",
      "3. low": "122.8700",
      "4. close": "122.9800",
      "5. volume": "64348"
    },
    "2020-05-06 11:45:00": {
      "1. open": "123.1100",
      "2. high": "123.1600",
      "3. low": "122.8600",
      "4. close": "122.9300",
      "5. volume": "16551"
    },
    "2020-05-06 11:40:00": {
      "1. open": "122.8600",
      "2. high": "123.2400",
      "3. low": "122.8000",
      "4. close": "123.1400",
      "5. volume": "26739"
    },
    "2020-05-06 11:35:00": {
      "1. open": "122.9400",
      "2. high": "122.9600",
      "3. low": "122.7900",
      "4. close": "122.8300",
      "5. volume": "20785"
    },
    "2020-05-06 11:30:00": {
      "1. open": "122.7000",
      "2. high": "122.9700",
      "3. low": "122.6800",
      "4. close": "122.9100",
      "5. volume": "69350"
    },
    "2020-05-06 11:25:00": {
      "1. open": "122.9921",
      "2. high": "123.0600",
      "3. low": "122.7100",
      "4. close": "122.7100",
      "5. volume": "37694"
    },
    "2020-05-06 11:20:00": {
      "1. open": "122.9500",
      "2. high": "123.2200",
      "3. low": "122.9399",
      "4. close": "123.0300",
      "5. volume": "35031"
    },
    "2020-05-06 11:15:00": {
      "1. open": "123.0500",
      "2. high": "123.2500",
      "3. low": "122.9300",
      "4. close": "122.9600",
      "5. volume": "33329"
    },
    "2020-05-06 11:10:00": {
      "1. open": "122.9700",
      "2. high": "123.0200",
      "3. low": "122.8200",
      "4. close": "122.9400",
      "5. volume": "22784"
    },
    "2020-05-06 11:05:00": {
      "1. open": "122.9750",
      "2. high": "123.1000",
      "3. low": "122.9300",
      "4. close": "122.9700",
      "5. volume": "19952"
    },
    "2020-05-06 11:00:00": {
      "1. open": "123.0350",
      "2. high": "123.1600",
      "3. low": "122.9500",
      "4. close": "122.9650",
      "5. volume": "23242"
    },
    "2020-05-06 10:55:00": {
      "1. open": "123.2000",
      "2. high": "123.2500",
      "3. low": "123.0200",
      "4. close": "123.0600",
      "5. volume": "21734"
    },
    "2020-05-06 10:50:00": {
      "1. open": "123.0500",
      "2. high": "123.3900",
      "3. low": "123.0500",
      "4. close": "123.1999",
      "5. volume": "23365"
    },
    "2020-05-06 10:45:00": {
      "1. open": "122.7700",
      "2. high": "123.0635",
      "3. low": "122.6900",
      "4. close": "123.0500",
      "5. volume": "22461"
    },
    "2020-05-06 10:40:00": {
      "1. open": "123.0592",
      "2. high": "123.1100",
      "3. low": "122.7700",
      "4. close": "122.7700",
      "5. volume": "24185"
    },
    "2020-05-06 10:35:00": {
      "1. open": "122.8900",
      "2. high": "123.1008",
      "3. low": "122.8500",
      "4. close": "123.0500",
      "5. volume": "21823"
    },
    "2020-05-06 10:30:00": {
      "1. open": "122.7500",
      "2. high": "123.0100",
      "3. low": "122.7200",
      "4. close": "122.8505",
      "5. volume": "21369"
    },
    "2020-05-06 10:25:00": {
      "1. open": "122.7700",
      "2. high": "122.8300",
      "3. low": "122.6525",
      "4. close": "122.7300",
      "5. volume": "37408"
    },
    "2020-05-06 10:20:00": {
      "1. open": "122.7800",
      "2. high": "123.1155",
      "3. low": "122.6700",
      "4. close": "122.7800",
      "5. volume": "43436"
    },
    "2020-05-06 10:15:00": {
      "1. open": "122.5800",
      "2. high": "122.7550",
      "3. low": "122.4700",
      "4. close": "122.7500",
      "5. volume": "41811"
    },
    "2020-05-06 10:10:00": {
      "1. open": "122.4100",
      "2. high": "122.6700",
      "3. low": "122.4100",
      "4. close": "122.5700",
      "5. volume": "32017"
    },
    "2020-05-06 10:05:00": {
      "1. open": "122.8150",
      "2. high": "122.9659",
      "3. low": "122.4600",
      "4. close": "122.4800",
      "5. volume": "40293"
    },
    "2020-05-06 10:00:00": {
      "1. open": "122.9300",
      "2. high": "123.0000",
      "3. low": "122.7100",
      "4. close": "122.7800",
      "5. volume": "38010"
    },
    "2020-05-06 09:55:00": {
      "1. open": "123.2900",
      "2. high": "123.4700",
      "3. low": "122.8700",
      "4. close": "122.9800",
      "5. volume": "44431"
    },
    "2020-05-06 09:50:00": {
      "1. open": "123.2000",
      "2. high": "123.6100",
      "3. low": "123.1400",
      "4. close": "123.3300",
      "5. volume": "28879"
    },
    "2020-05-06 09:45:00": {
      "1. open": "123.3837",
      "2. high": "123.5200",
      "3. low": "123.0350",
      "4. close": "123.1900",
      "5. volume": "32431"
    },
    "2020-05-06 09:40:00": {
      "1. open": "123.3196",
      "2. high": "123.7060",
      "3. low": "123.2450",
      "4. close": "123.3000",
      "5. volume": "32561"
    },
    "2020-05-06 09:35:00": {
      "1. open": "123.2500",
      "2. high": "124.0500",
      "3. low": "123.2000",
      "4. close": "123.6124",
      "5. volume": "115470"
    }
  }
});

const parseDateTime = timeParse("%Y-%m-%d %H:%M:%S");

interface DataStruct{
  [date: string]: {};
}

/**
 * @description
 * @param data : data to trim to only show today's date
 * @returns
 */
function trimData(data: DataStruct) {
  
  var today = new Date();
  var result : DataStruct  = {}
  Object.keys(data).map((date: string) => {
    var rawDate = parseDateTime(date);
    //special case for weekend
    if(today.getDate() == rawDate?.getDate() || [6, 0].includes(today.getDay()) ){ //if no data is returned, then it will just fail. So when we fetch data, ensure that if it's a weekend, we still get the previous day's data
      result[date] = data[date];
    }
  });
  return result;
}

function convertJsonToCsv(data: string) {
  var test = JSON.parse(data);
  var testTime = test["Time Series (5min)"]; //might allow them to change this in the future, to show longer versus shorter. (must pay for shorter)
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
  //console.log(csvOut);
  return csvOut;
}

export function getData(tag: string) {
  // take the tag as argument and is  IUDORZ4BGIONCWPR , https://www.alphavantage.co/documentation/ Only allowed 5 calls a minute with a total of 500 calls a day.
  const promiseIntraDayContinuous = fetch(
    //`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${tag}&interval=5min&apikey=IUDORZ4BGIONCWPR`
    "https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/bitfinex_xbtusd_1m.csv"
  )
    .then(response => response.text())
    .then(data => {
      var csv = convertJsonToCsv(testData);
      return csvParse(csv, parseData(parseDateTime));
    })
    .then(data => {
      data.sort((a: IData, b: IData) => {
        return a.date.valueOf() - b.date.valueOf();
      });
      return data;
    });
  return promiseIntraDayContinuous;
}
