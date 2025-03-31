import styles from './index.module.scss';
import cn from 'classnames';
import { SignInComponent } from './sign-in';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const HeaderComponent = ({ className }: Props) => {
  return (
    <div className={cn(styles['header'], { className: className })}>
      <Link href="/" className={styles?.['logo-wrapper']}>
        <div className={styles?.['logo']}>Crypto Tracker</div>
      </Link>
      <div className={styles?.['sign-in-wrapper']}>
        <SignInComponent />
      </div>
    </div>
  );
};
