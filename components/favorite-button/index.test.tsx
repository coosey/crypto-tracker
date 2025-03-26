import '@testing-library/react';
import { FavoriteButton } from '.';
import {userEvent} from '@testing-library/user-event';
import {render, screen, waitFor} from '../../libs/utils/mantineTestUtil';

describe('FavoriteButton Component', () => {
  it('renders FavoriteButton component correctly', () => {
    render(
      <FavoriteButton />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('changes color on click', async () => {
    render(
      <FavoriteButton />
    );
    const button = screen.getByRole('button');
    const favoriteIcon = screen.getByTestId('favorite');

    expect(favoriteIcon).toHaveAttribute('fill', '');

    await userEvent.click(button);
    await waitFor(() => {
      expect(favoriteIcon).toHaveAttribute('fill', 'yellow');
    });
  });
});