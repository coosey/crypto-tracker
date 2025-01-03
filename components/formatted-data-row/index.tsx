import { FormattedNumber } from 'components/formatted-number';
import styles from './index.module.scss';

interface FormattedDataRowProps {
  rowName: string;
  rowPrice?: number;
  rowValue?: string | number | React.ReactNode;
};

export const FormattedDataRow = ({
  rowName, 
  rowPrice, 
  rowValue
}: FormattedDataRowProps) => {
  return (
    <div key={rowName} className={styles?.['table-row']}>
      <span className={styles?.['table-row_name']}>{rowName}</span>
      <span className={styles?.['table-row_price']}>
        {rowValue ? rowValue : <FormattedNumber value={rowPrice} />}
      </span>
    </div>
  );
};