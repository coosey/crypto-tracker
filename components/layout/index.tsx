import styles from './index.module.scss';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
  return (
    <div className={styles['container']}>
      {children}
    </div>
  )
}