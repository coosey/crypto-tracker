import { Anchor, Breadcrumbs } from '@mantine/core';
import styles from './index.module.scss';

interface Props {
  name: string;
}

export const BreadCrumbItems = ({ name }: Props) => {
  const breadCrumbItems = [
    { title: 'Crytocurrencies', href: '/' },
    { title: `${name} Price`, href: null },
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
    <div className={styles?.['breadcrumb']}>
      <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
        {breadCrumbItems}
      </Breadcrumbs>
    </div>
  );
};
