import styles from './index.module.scss';
import cn from 'classnames';

interface MainComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export const MainComponent = ({ children, className }: MainComponentProps) => {
  return (
    <div className={cn(
      styles['main'], 
      styles?.['screener-grid'], 
      { className: className })}>
      {children}
    </div>
  );
};
