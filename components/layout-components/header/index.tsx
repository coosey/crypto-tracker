import styles from './index.module.scss';
import cn from 'classnames';
import { SignInComponent } from './sign-in';
import Link from 'next/link';

interface Props {
  className?: string;
}

const LogoComponent = () => {
  return (
    <Link href="/" className={styles?.['logo-wrapper']}>
      <div className={styles?.['banner']}>
        <img className={styles?.['banner-image']} src="/images/cryptowl.png" alt="cryptowl" />
      </div>
    </Link>
  )
}

export const HeaderComponent = ({ className }: Props) => {
  return (
    <div className={cn(styles['header'], { className: className })}>
      <LogoComponent />
      <div className={styles?.['sign-in-wrapper']}>
        <SignInComponent />
      </div>
    </div>
  );
};
