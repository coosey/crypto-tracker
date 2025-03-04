import { SortDirection } from "libs/types/market-data-table/types";
import { TickersMarketObject } from "libs/types/tickers";

/**
 * Helper function to sort string values of TickersMarketObject List
 * @param direction SortDirection
 * @param aField keyof TickersMarketObject
 * @param bField keyof TickersMarketObject
 * @returns sorted order of TickersMarketObject field by direction
 */
function sortLocalCompare(
  direction: SortDirection,
  aField: keyof TickersMarketObject,
  bField: keyof TickersMarketObject
) {
  return direction === 'ASC' ? aField?.localeCompare?.(bField) : bField?.localeCompare?.(aField);
};

/**
 * Helper function to help sort trust_score of TickersMarketObject List
 * @param color 'green' | 'yellow' | 'red' | null
 * @returns order of trust_score values given color
 */
function getTrustScoreValue(color) {
  switch (color?.toLowerCase?.()) {
    case 'green':
      return 3;
    case 'yellow':
      return 2;
    case 'red':
      return 1;
    default:
      return 0; // for null or undefined values
  }
}

/**
 * Helper function to sort trust_score of TickersMarketObject List
 * @param direction SortDirection
 * @param trustA trust_score color
 * @param trustB trust_score color
 * @returns sorted order of trust_score given direction
 */
function sortTrustScore(
  direction: SortDirection,
  trustA: keyof TickersMarketObject,
  trustB: keyof TickersMarketObject
) {
  const scoreA = getTrustScoreValue(trustA);
  const scoreB = getTrustScoreValue(trustB);
  // descending order (green first)
  return direction === 'ASC' ? scoreB - scoreA : scoreA - scoreB;
}

/**
 * Helper function to sort numeric values of TickersMarketObject List
 * @param direction SortDirection
 * @param numA number
 * @param numB number
 * @returns sorted list of numbers given direction
 */
function sortNumeric(
  direction: SortDirection,
  numA: number,
  numB: number
) {
  const result = numA - numB;
  return direction === 'ASC' ? result : -result;
};

export {
  sortLocalCompare,
  sortNumeric,
  sortTrustScore,
}