import '@testing-library/react';
import { TrendPriceHeader } from '.';
import { render, screen } from 'libs/utils/mantineTestUtil';

describe('TrendPriceHeader Component', () => {
  const propsMock = {
    activeCoins: 100,
    totalExchanges: 200,
    totalMarketCap: 3000000,
    marketCapChangePercentage: 5,
    volume: 1000000,
    loading: false,
  };

  it('renders component correctly', () => {
    render(<TrendPriceHeader {...propsMock} />);
    const trendPriceHeader = screen.getByTestId('trend-price-header');
    expect(trendPriceHeader).toBeInTheDocument();
  });

  it('renders component with loading state', () => {
    render(<TrendPriceHeader {...propsMock} loading={true} />);
    const trendPriceHeader = screen.getByTestId('trend-price-header-loader');
    expect(trendPriceHeader).toBeInTheDocument();
  });
});
