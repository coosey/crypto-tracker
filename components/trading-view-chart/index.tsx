import React, { useEffect, useRef } from 'react';
import {
  createChart,
  ColorType,
  AreaSeries,
  HistogramSeries,
  Time,
  IChartApi,
  BarData,
  CustomData,
  HistogramData,
  LineData,
} from 'lightweight-charts';
import styles from './index.module.scss';
import { isEmpty } from 'lodash';

// -------------------------------------------------------
// ----------------- Color constants ---------------------
const BACKGROUND_COLOR = '#0B0F14';
const GRID_COLOR = '#2C353F';

const LINE_COLOR = '#32ca5b';
const FILL_COLOR = 'rgba(15, 87, 32, 0.28)';
// -------------------------------------------------------
// -------------------------------------------------------

export const TradingViewChart = ({ prices, total_volumes }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !prices?.length) return;
    // -------------------------------------------------------
    // ----------------- Create the chart instance -----------
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { type: ColorType.Solid, color: BACKGROUND_COLOR },
        textColor: 'white',
      },
      crosshair: {
        // hide the horizontal crosshair line
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        // hide the vertical crosshair label
        vertLine: {
          style: 1,
        },
      },
      grid: {
        horzLines: {
          color: GRID_COLOR,

        },
        vertLines: {
          visible: false,
        }
      },
      timeScale: {
        // Show time on the x-axis
        timeVisible: true,
        // Hide seconds for better readability
        secondsVisible: false,
        // X-axis border color
        borderColor: GRID_COLOR,
        tickMarkFormatter: (time) => {
          // Convert seconds to milliseconds
          const changedDate = new Date(time * 1000);
          return `${changedDate.getFullYear()}-${String(changedDate.getMonth() + 1).padStart(2, '0')}-${String(changedDate.getDate()).padStart(2, '0')}`; // Format as YYYY-MM-DD
        },
      },
      rightPriceScale: {
        // Hide the right Y-axis border
        borderVisible: false,
        scaleMargins: {
          // Margin at the top of the Y-axis
          top: 0.3,
          // Margin at the bottom of the Y-axis
          bottom: 0.25,
        },
        // Ensure text labels don't overlap
        entireTextOnly: true,
        // Y-axis text color
        textColor: 'white',
      },
    });
    // -------------------------------------------------------
    // ----------------- Add the area series -----------------
    const areaSeries = addAreaSeries(chart, prices);

    // ----------------- Add the volume series ---------------
    const volumeSeries = addVolumeSeries(chart, total_volumes);

    // ----------------- Add the tooltip ---------------------
    const container = document.getElementById('container');

    const toolTipWidth = 100;
    const toolTipHeight = 120;
    const toolTipMargin = 15;

    // Create and style the tooltip html element
    const toolTip = document.createElement('div');
    toolTip.className = styles?.['toolTip'];
    toolTip.style.display = 'none';
    toolTip.style.color = '#ffffff';
    toolTip.style.background = GRID_COLOR;
    toolTip.style.borderColor = BACKGROUND_COLOR;

    container.appendChild(toolTip);

    // update tooltip
    chart.subscribeCrosshairMove(param => {
      const areaData = param.seriesData.get(areaSeries);
      const volumeData = param.seriesData.get(volumeSeries);
      if (isEmpty(areaData)) {
        toolTip.style.display = 'none';
      } else {
        const dateStr = param.time;
        // console.log('dateStr',dateStr)

        toolTip.style.display = 'block';
        toolTip.style.width = '200px';
        toolTip.style.height = '100px';
        toolTip.style.borderRadius = '5px';

        const AREA_PRICE = getChartData(areaData);
        const VOLUME_PRICE = getChartData(volumeData);

        toolTip.innerHTML = `
          <div class=${styles?.['tooltipWrapper']}>
            <div class=${styles?.['tooltipWrapper__price']}>
              <span class=${styles?.['tooltipWrapper--label']}>Price:</span>
              <span class=${styles?.['tooltipWrapper--amount']}>
                $${(Math.round(100 * AREA_PRICE) / 100).toLocaleString()}
              </span>
            </div>
            <div class=${styles?.['tooltipWrapper__volume']}>
              <span class=${styles?.['tooltipWrapper--label']}>Vol:</span>
              <span class=${styles?.['tooltipWrapper--amount']}>
                $${Math.round((100 * VOLUME_PRICE) / 100).toLocaleString()}
              </span>
            </div>
          </div>
        `;
        const y = param.point.y;
        let left = param.point.x + toolTipMargin;
        if (left > container.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > container.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin;
        }
        toolTip.style.left = left + 'px';
        toolTip.style.top = top + 'px';
      }
    });
    // -------------------------------------------------------
    // -------------------------------------------------------

    // Fit the chart to the data
    chart.timeScale().fitContent();

    // Handle resizing
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [prices]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <div ref={chartContainerRef} className={styles?.['container']} id='container' />
    </div>
  );
};

function convertTime(dataToConvert) {
  return dataToConvert?.map?.(([time, value]) => ({
    // Convert milliseconds to seconds and cast to Time
    time: (time / 1000) as Time,
    value,
  }));
};

function getChartData(
  chartData: HistogramData<Time> | BarData<Time> | LineData<Time> | CustomData<Time>
) {
  return chartData['value'] !== undefined ? chartData['value'] : chartData['close'];
};

/**
 * Helper function to add an area series to the chart.
 * @param newChart The main interface of a single chart using time for horizontal scale.
 * @param prices Price data to be displayed on the chart.
 * @returns The area series that was added to the chart.
 */
function addAreaSeries(newChart: IChartApi, prices: number[][]) {
  const areaSeries = newChart.addSeries(AreaSeries, {
    // Stroke color (border) for area series
    lineColor: LINE_COLOR,
    // Fill color (middle) for area series
    topColor: FILL_COLOR,
    // Fill color (bottom) for area series
    bottomColor: BACKGROUND_COLOR,
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
};

/**
 * Helper function to add a volume series to the chart.
 * @param newChart The main interface of a single chart using time for horizontal scale.
 * @param volume Volume data to be displayed on the chart.
 * @returns The volume series that was added to the chart.
 */
function addVolumeSeries(newChart: IChartApi, volume: number[][]) {
  const volumeSeries = newChart.addSeries(HistogramSeries, {
    color: GRID_COLOR,
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
};