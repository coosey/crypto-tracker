export function formatWithSubscriptZeros(num: number, trailingLimit = 3, significantDigitsLimit = 4) {
    // Convert scientific notation (e.g., 5.303e-7) to decimal string
    const numStr = num < 0.0001 ? num?.toFixed?.(20) : num?.toString?.();
    const [integerPart, decimalPart = ''] = numStr?.split?.('.');
    // Early return if numbers >= 0.001 (no subscript)
    if (num >= 0.001) {
        const formattedNum = num?.toLocaleString?.('en-US', {
            maximumFractionDigits: trailingLimit,
            useGrouping: true
        })?.replace(/(\.0+|0+)$/, '');
        return `$${formattedNum}`;
    }
    // Count leading zeros in the decimal part
    let leadingZeros = 0;
    for (const char of decimalPart) {
        if (char === '0') leadingZeros++;
        else break;
    }
    const subscriptMap = {
        '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
        '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
        '10': '₁₀', '11': '₁₁', '12': '₁₂', '13': '₁₃', '14': '₁₄',
    };
    const subscriptZeros = String(leadingZeros)?.split?.('')
        ?.map?.(digit => subscriptMap[digit])?.join?.('');
    // Extract significant digits (skip leading zeros)
    const significantDigits = decimalPart?.slice?.(leadingZeros)?.slice?.(0, significantDigitsLimit); // Limit to 4 digits

    return `$0.0${subscriptZeros}${significantDigits}`;
}