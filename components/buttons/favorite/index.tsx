import { UnstyledButton } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import styles from './index.module.scss';

interface Props {
  handleFavoriteClick?: () => void;
  selected: boolean;
}

export const FavoriteButton = ({ handleFavoriteClick, selected }: Props) => {
  return (
    <UnstyledButton className={styles?.['favorite']} onClick={handleFavoriteClick}>
      <IconStar data-testid="favorite" stroke={2} fill={selected ? 'yellow' : ''} />
    </UnstyledButton>
  );
};
