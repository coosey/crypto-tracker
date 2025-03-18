import { NumberFormatter } from '@mantine/core';

interface Props {
  value: number;
  noPrefix?: boolean;
}

export const FormattedNumber = ({ value, noPrefix }: Props) => {
  return (
    <NumberFormatter
      data-testid="formatted-number"
      value={value}
      prefix={!noPrefix ? '$' : ''}
      decimalScale={2}
      thousandSeparator=","
    />
  );
};
