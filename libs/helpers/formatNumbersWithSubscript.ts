/**
 * CREDITS TO HAQQ
 * 
 * GITHUB REPO: https://github.com/haqq-network/format-number-with-subscript-zeros/blob/master/src/formatNumberWithSubscriptZeros.ts
 */
export function formatNumberWithSubscriptZeros(numberStr: string, presiction = 3, min = 0.001): string {
  if (!numberStr?.length) return;
  const number = parseFloat(numberStr);
  if (number >= min) {
      const [part0, part1] = numberStr.split('.')
      if(part1) {
          const leadingZeros = part1?.match?.(/^0+/)?.[0] || '';
          return `${part0}.${leadingZeros}${part1.replace(leadingZeros, '').slice(0, presiction)}`
      }
      return part1 ? [part0, part1.slice(0, presiction)].join('.') : part0;
  }

  const leadingZerosMatch = numberStr.match(/^0\.(0+)/);
  if (!leadingZerosMatch) return numberStr;

  const leadingZerosCount = leadingZerosMatch[1].length;
  const remainingDigits = numberStr.slice(leadingZerosMatch[0].length);

  const smallCount = String(leadingZerosCount).split('').map(digit => String.fromCharCode(8320 + parseInt(digit))).join('');

  return `0.0${smallCount}${remainingDigits.slice(0, presiction)}`;
};