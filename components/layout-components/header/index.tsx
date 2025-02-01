import styles from './index.module.scss';
import { SignInComponent } from './sign-in';

export const HeaderComponent = () => {
  return (
    <>
      <header className={styles['header']}>
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
