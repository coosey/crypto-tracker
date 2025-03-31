import '@testing-library/react';
import { GlobalTrendPrice } from '.';
import { render, screen } from 'libs/utils/mantineTestUtil';

describe('GlobalTrendPrice Component', () => {
  it('renders component correctly', () => {
    render(<GlobalTrendPrice />);
    const globalTrendPrice = screen.getByTestId('global-trend-price');
    expect(globalTrendPrice).toBeInTheDocument();
  });
  it('renders component with market cap', () => {
    render(<GlobalTrendPrice />);
    const marketCap = screen.getByText('Market Cap');
    expect(marketCap).toBeInTheDocument();
  });
  it('renders component with 24h volume', () => {
    render(<GlobalTrendPrice />);
    const volume = screen.getByText('24h Volume');
    expect(volume).toBeInTheDocument();
  });
});
