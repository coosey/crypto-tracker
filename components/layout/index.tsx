import styles from './index.module.scss';
import {
  HeaderComponent,
  MainComponent,
  FooterComponent,
} from 'components/layout-components';
import cn from 'classnames';

interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={cn(styles['layout'], { className: className })}>
      <HeaderComponent className={styles?.['header']} />
      <MainComponent className={styles?.['main']}>{children}</MainComponent>
      <FooterComponent />
    </div>
  );
};
