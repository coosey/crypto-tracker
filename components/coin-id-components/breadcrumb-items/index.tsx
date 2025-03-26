import { Anchor, Breadcrumbs } from '@mantine/core';
import cn from 'classnames';
import styles from './index.module.scss';

interface Props {
  name: string;
  className?: string;
}

export const BreadCrumbItems = ({ name, className }: Props) => {
  const breadCrumbItems = [
    { title: 'Crytocurrencies', href: '/' },
    { title: name, href: null },
  ].map((item, index) => {
    if (item?.href) {
      return (
        <Anchor className={styles?.['breadcrumb_link']} href={item?.href} key={index}>
          {item?.title}
        </Anchor>
      );
    } else {
      return (
        <span className={styles?.['breadcrumb_nolink']} key={index}>
          {item?.title}
        </span>
      );
    }
  });

  return (
    <div className={cn(styles?.['breadcrumb'], className)}>
      <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
        {breadCrumbItems}
      </Breadcrumbs>
    </div>
  );
};
