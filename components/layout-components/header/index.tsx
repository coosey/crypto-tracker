import styles from './index.module.scss';
import cn from 'classnames';
import { SignInComponent } from './sign-in';

interface Props {
  className?: string;
}

export const HeaderComponent = ({ className }: Props) => {
  return (
    <>
      <header className={cn(styles['header'], { className: className })}>
        <div className={styles?.['sign-in-wrapper']}>
          <div className="logo">Crypto Tracker</div>
          <SignInComponent />
        </div>
        {/* <nav className={styles['nav-menu']}>
        </nav> */}
        {/* <div className={styles['hamburger']}>☰</div> */}
      </header>
    </>
  );
};
