import {
  Time,
  IChartApi,
  AreaSeries,
  HistogramSeries,
  BarData,
  CustomData,
  HistogramData,
  LineData,
  MouseEventParams,
} from 'lightweight-charts';
import { monthObjectHelper } from 'libs/helpers/monthObjectHelper';

// -------------------------------------------------------
// Color constants ---------------------------------------
export const CHART_COLORS = {
  background: '#0B0F14',
  grid: '#2C353F',
  line: '#32ca5b',
  fill: 'rgba(15, 87, 32, 0.28)',
};

// -------------------------------------------------------
// Tooltip constants -------------------------------------
export const TOOLTIP_DISPLAY = {
  width: 100,
  height: 120,
  margin: 15,
};

/**
 * Helper function to update the tooltip position based on the current data point.
 * @param param current data point
 * @param container chart container
 * @param toolTip tooltip to be displayed
 */
export function updateTooltipPosition(
  param: MouseEventParams<Time>,
  container: HTMLElement,
  toolTip: HTMLDivElement
) {
  const y = param.point.y;
  let left = param.point.x + TOOLTIP_DISPLAY.margin;
  if (left > container.clientWidth - TOOLTIP_DISPLAY.width) {
    left = param.point.x - TOOLTIP_DISPLAY.margin - TOOLTIP_DISPLAY.width;
  }

  let top = y + TOOLTIP_DISPLAY.margin;
  if (top > container.clientHeight - TOOLTIP_DISPLAY.height) {
    top = y - TOOLTIP_DISPLAY.height - TOOLTIP_DISPLAY.margin;
  }
  toolTip.style.left = left + 'px';
  toolTip.style.top = top + 'px';
}

/**
 * Helper function to convert time scale to a formatted date string.
 * @param time number
 * @returns formatted date string in the format 'MMM DD'
 */
export function convertTimeScale(time: number) {
  // Convert seconds to milliseconds
  const changedDate = new Date(time * 1000);
  const currentMonth = changedDate.getMonth();
  const parsedMonth = monthObjectHelper?.[currentMonth];
  const currentDay = changedDate.getDate();
  return `${parsedMonth?.abbreviation} ${currentDay}`;
}

/**
 * Helper function to convert price data to the format expected by lightweight-charts.
 * @param dataToConvert Price data to be displayed on the chart.
 * @returns converted data format for lightweight-charts
 */
export function convertTime(dataToConvert) {
  return dataToConvert?.map?.(([time, value]) => ({
    // Convert milliseconds to seconds and cast to Time
    time: (time / 1000) as Time,
    value,
  }));
}

/**
 * Helper function to get the chart value or close value based on chart type.
 * @param chartData type of chart by lightweight-charts
 * @returns given chart value or close value
 */
export function getChartData(
  chartData: HistogramData<Time> | BarData<Time> | LineData<Time> | CustomData<Time>
) {
  return chartData['value'] !== undefined ? chartData['value'] : chartData['close'];
}

/**
 * Helper function to add an area series to the chart.
 * @param newChart The main interface of a single chart using time for horizontal scale.
 * @param prices Price data to be displayed on the chart.
 * @returns The area series that was added to the chart.
 */
export function addAreaSeries(newChart: IChartApi, prices: number[][]) {
  const areaSeries = newChart.addSeries(AreaSeries, {
    // Stroke color (border) for area series
    lineColor: CHART_COLORS.line,
    // Fill color (middle) for area series
    topColor: CHART_COLORS.fill,
    // Fill color (bottom) for area series
    bottomColor: CHART_COLORS.background,
    lineWidth: 2,
  });
  areaSeries.priceScale().applyOptions({
    scaleMargins: {
      // highest point of the series will be 10% away from the top
      top: 0.1,
      // lowest point will be 40% away from the bottom
      bottom: 0.4,
    },
  });
  // Transform the data into the format expected by lightweight-charts
  const formattedPriceData = convertTime(prices);
  // Set the data for the area series
  areaSeries.setData(formattedPriceData);
  return areaSeries;
}

/**
 * Helper function to add a volume series to the chart.
 * @param newChart The main interface of a single chart using time for horizontal scale.
 * @param volume Volume data to be displayed on the chart.
 * @returns The volume series that was added to the chart.
 */
export function addVolumeSeries(newChart: IChartApi, volume: number[][]) {
  const volumeSeries = newChart.addSeries(HistogramSeries, {
    color: CHART_COLORS.grid,
    priceFormat: {
      type: 'volume',
    },
    // set as an overlay by setting a blank priceScaleId
    priceScaleId: '',
  });
  volumeSeries.priceScale().applyOptions({
    scaleMargins: {
      // highest point of the series will be 85% away from the top
      top: 0.85,
      bottom: 0,
    },
  });
  const formattedVolumeData = convertTime(volume);
  volumeSeries.setData(formattedVolumeData);
  return volumeSeries;
}
