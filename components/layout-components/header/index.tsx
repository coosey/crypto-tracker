import styles from './index.module.scss';

export const HeaderComponent = () => {
  return (
    <>
      <header className={styles['header']}>
        <div className="logo">Crypto Tracker</div>
        {/* <nav className={styles['nav-menu']}>
        </nav> */}
        {/* <div className={styles['hamburger']}>☰</div> */}
      </header>
    </>
  );
};
