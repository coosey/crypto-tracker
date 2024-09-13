import styles from './index.module.scss';

interface MainComponentProps {
  children?: React.ReactNode;
}

export const MainComponent = ({children}: MainComponentProps) => {
  return (
    <>
      <main className={styles['main']}>
        {/* <!-- Main content goes here, like charts, tables, etc. --> */}
        {children}
      </main>
    </>
  )
}