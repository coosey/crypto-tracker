/**
 * Function to format large numbers into a more compact format.
 * @param inputNum number to be formatted
 * @param locale defines the locale to use, defaults to 'en-US'
 * @returns formatted number if inputNum is greater than 1000
 */
export function compactNumbers(inputNum: number, locale = 'en-US') {
  const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
  });

  if (inputNum >= 1e6) {
      return formatter.format(inputNum / 1e6) + 'M'; // Millions
  } else if (inputNum >= 1e3) {
      return formatter.format(inputNum / 1e3) + 'k'; // Thousands
  } else {
      return formatter.format(inputNum); // Less than 1000
  }
};
