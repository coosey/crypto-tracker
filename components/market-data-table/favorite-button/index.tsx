import { UnstyledButton } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import styles from './index.module.scss';
import { useState } from 'react';

export const FavoriteButton = () => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <UnstyledButton className={styles?.['favorite']} onClick={handleClick}>
      <IconStar
        className={styles?.['favorite_btn']}
        stroke={2}
        fill={selected ? 'yellow' : null}
      />
    </UnstyledButton>
  );
};
