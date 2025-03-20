import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import styles from './index.module.scss';
import { isEmpty } from 'lodash';
import { compactNumbers } from 'libs/helpers/compactNumbers';
import {
  CHART_COLORS,
  getChartData,
  addAreaSeries,
  addVolumeSeries,
  convertTimeScale,
  updateTooltipPosition
} from './helpers';

export const TradingViewChart = ({ prices, total_volumes }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !prices?.length) return;
    // -------------------------------------------------------
    // Create the chart instance -----------------------------
    const chart = createChart(chartContainerRef.current, {
      // handleScale: false,
      // handleScroll: false,
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { type: ColorType.Solid, color: CHART_COLORS.background },
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
          labelVisible: false,
        },
      },
      grid: {
        horzLines: {
          color: CHART_COLORS.grid,
        },
        vertLines: {
          visible: false,
        },
      },
      timeScale: {
        // X-axis border color
        borderColor: CHART_COLORS.grid,
        tickMarkFormatter: (time: number) => convertTimeScale(time),
        rightOffset: 0,
        fixLeftEdge: true,
        fixRightEdge: true,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        visible: true,
        // Ensure time is visible on the x-axis
        timeVisible: true, 
        secondsVisible: false,
        shiftVisibleRangeOnNewBar: true,
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
    // Apply the custom priceFormatter to the chart
    chart.applyOptions({
      localization: {
        priceFormatter: compactNumbers,
      },
    });
    // -------------------------------------------------------
    // Add the Area series -----------------------------------
    const areaSeries = addAreaSeries(chart, prices);
    // Add the Volume series ---------------------------------
    const volumeSeries = addVolumeSeries(chart, total_volumes);
    // Add the tooltip ---------------------------------------
    const container = document.getElementById('container');
    // Create and style the tooltip html element
    const toolTip = document.createElement('div');
    toolTip.className = styles?.['toolTip'];
    toolTip.style.display = 'none';
    toolTip.style.color = '#ffffff';
    toolTip.style.background = CHART_COLORS.grid;
    toolTip.style.borderColor = CHART_COLORS.background;

    container.appendChild(toolTip);

    // Update tooltip ------------------------------
    chart.subscribeCrosshairMove((param) => {
      const areaData = param.seriesData.get(areaSeries);
      const volumeData = param.seriesData.get(volumeSeries);
      if (isEmpty(areaData)) {
        toolTip.style.display = 'none';
      } else {
        // Convert the date to a more readable format
        const dateStr = param.time;
        const modifiedDateFormat = new Date(dateStr as number * 1000).toLocaleString()
        // Set the tooltip content and style
        toolTip.style.display = 'block';
        toolTip.style.width = '200px';
        toolTip.style.height = '100px';
        toolTip.style.borderRadius = '5px';
        // Get the price and volume data
        const AREA_PRICE = getChartData(areaData);
        const VOLUME_PRICE = getChartData(volumeData);

        toolTip.innerHTML = `
          <div class=${styles?.['tooltipWrapper']}>
            <div class=${styles?.['tooltipWrapper__date']}>
              <span class=${styles?.['tooltipWrapper--amount']}>${modifiedDateFormat}</span>
            </div>
            <div class=${styles?.['tooltipWrapper__price']}>
              <span class=${styles?.['tooltipWrapper--label']}>Price:</span>
              <span class=${styles?.['tooltipWrapper--amount']}>
                $${(Math.round(100 * AREA_PRICE) / 100).toLocaleString()}
              </span>
            </div>
            <div class=${styles?.['tooltipWrapper__volume']}>
              <span class=${styles?.['tooltipWrapper--label']}>Vol:</span>
              <span class=${styles?.['tooltipWrapper--amount']}>
                $${(Math.round(100 * VOLUME_PRICE) / 100).toLocaleString()}
              </span>
            </div>
          </div>
        `;
        // Update the tooltip position
        updateTooltipPosition(param, container, toolTip);
      }
    });
    // -------------------------------------------------------
    // -------------------------------------------------------
    // Fit the chart to the data
    // chart.timeScale().fitContent();
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
      <div ref={chartContainerRef} className={styles?.['container']} id="container" />
    </div>
  );
};


