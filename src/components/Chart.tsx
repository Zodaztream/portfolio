/**
 * Chart component:
 * This displays a chart with the data it retrieves.
 */

import React from "react";

import { scaleTime } from "d3-scale";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

//@ts-ignore
import { ChartCanvas, Chart } from "react-stockcharts";
//@ts-ignore
import { BarSeries, CandlestickSeries } from "react-stockcharts/lib/series";
//@ts-ignore
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
//@ts-ignore
import { CrossHairCursor } from "react-stockcharts/lib/coordinates";
//@ts-ignore
import { EdgeIndicator } from "react-stockcharts/lib/coordinates";
//@ts-ignore
import { CurrentCoordinate } from "react-stockcharts/lib/coordinates";
//@ts-ignore
import { MouseCoordinateX } from "react-stockcharts/lib/coordinates";
//@ts-ignore
import { MouseCoordinateY } from "react-stockcharts/lib/coordinates";

//@ts-ignore
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
//@ts-ignore
import { fitDimensions } from "react-stockcharts/lib/helper";
//@ts-ignore
import { last } from "react-stockcharts/lib/utils";
import { DSVParsedArray } from "d3-dsv";

interface IData {
  date: string;
  volume: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

type Props = {
  data: DSVParsedArray<any>;
  width: number;
  height: number;
  ratio: number;
  type: string;
  id: string;
};
/**
 * @description A 'ready-example' adapted to work for this project and
 * extended to work with typescript
 */
class CandleStickChartForContinuousIntraDay extends React.Component<Props> {
  render() {
    const { type, data, width, ratio, height, id } = this.props;

    const xAccessor = (d: IData) => d.date;
    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width}
        margin={{ left: 80, right: 80, top: 10, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={scaleTime()}
        xAccessor={xAccessor}
        xExtents={xExtents}
      >
        <Chart
          id={id}
          yExtents={[(d: IData) => d.volume]}
          height={150}
          origin={(w: number, h: number) => [0, h - 150]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={format(".2s")}
          />

          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".4s")}
          />

          <BarSeries
            yAccessor={(d: IData) => d.volume}
            fill={(d: IData) => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />

          <CurrentCoordinate
            yAccessor={(d: IData) => d.volume}
            fill="#9B0A47"
          />

          <EdgeIndicator
            itemType="first"
            orient="left"
            edgeAt="left"
            yAccessor={(d: IData) => d.volume}
            displayFormat={format(".4s")}
            fill="#0F0F0F"
          />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={(d: IData) => d.volume}
            displayFormat={format(".4s")}
            fill="#0F0F0F"
          />
        </Chart>
        <Chart
          id={id + 2}
          yExtents={[(d: IData) => [d.high, d.low]]}
          padding={{ top: 40, bottom: 20 }}
        >
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" ticks={5} />

          <MouseCoordinateX
            rectWidth={60}
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%H:%M:%S")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />

          <CandlestickSeries />

          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={(d: IData) => d.close}
            fill={(d: IData) => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />

          <OHLCTooltip
            origin={[-40, 0]}
            xDisplayFormat={timeFormat("%Y-%m-%d %H:%M:%S")}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

export default fitDimensions(CandleStickChartForContinuousIntraDay);
