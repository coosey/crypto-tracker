import '@testing-library/react';
import { render, screen } from 'libs/utils/mantineTestUtil';
import { FormattedDataRow } from '.';

describe('FormattedDataRow Component', () => {
  it('Should render FormattedDataRow Component correctly', () => {
    render(
      <FormattedDataRow
        rowName="Test"
        rowPrice={10000}
        priceDiff24High={100}
        priceDiff24Low={20}
        priceDiff7High={80}
        priceDiff7Low={40}
      />
    );
    const formattedDataRow = screen.getByText('Test');
    expect(formattedDataRow).toMatchSnapshot();
  });
  it('Should render HoverCard correctly', () => {
    render(
      <FormattedDataRow
        rowName="HoverCard"
        rowPrice={10000}
        hoverCard
        hoverCardName="HoverCard Test"
        hoverCardDescription="This is a test HoverCard description"
      />
    );
    const formattedDataRow = screen.getByText('HoverCard');
    expect(formattedDataRow).toMatchSnapshot();
  });
  it('Should render Market Cap correctly', () => {
    render(
      <FormattedDataRow
        rowName="Market Cap"
        rowPrice={10000}
        hoverCard
        hoverCardName="Market Cap = Current Price x Circulating Supply"
        hoverCardDescription="Refers to the total market value of a cryptocurrency’s circulating supply. It is similar to the stock market’s measurement of multiplying price per share by shares readily available in the market (not held & locked by insiders"
      />
    );
    const formattedDataRow = screen.getByText('Market Cap');
    expect(formattedDataRow).toMatchSnapshot();
  });
  it('Should render Volume correctly', () => {
    render(
      <FormattedDataRow
        rowName="Volume"
        rowPrice={10000}
        hoverCard
        hoverCardName="Volume"
        hoverCardDescription="A measure of how much of a cryptocurrency was traded in the last 24 hours."
      />
    );
    const formattedDataRow = screen.getByText('Volume');
    expect(formattedDataRow).toMatchSnapshot();
  });
  it('Should render FDV correctly', () => {
    render(
      <FormattedDataRow
        rowName="FDV"
        rowPrice={10000}
        hoverCard
        hoverCardName="Fully Diluted Valuation (FDV) = Current Price x Total Supply"
        hoverCardDescription="Fully Diluted Valuation (FDV) is the theoretical market capitalization of a coin if the entirety of its supply is in circulation, based on its current market price. The FDV value is theoretical as increasing the circulating supply of a coin may impact its market price. Also depending on the tokenomics, emission schedule or lock-up period of a coin's supply, it may take a significant time before its entire supply is released into circulation."
      />
    );
    const formattedDataRow = screen.getByText('FDV');
    expect(formattedDataRow).toMatchSnapshot();
  });
  it('Should render Circulating Supply correctly', () => {
    render(
      <FormattedDataRow
        rowName="Circulating Supply"
        rowPrice={10000}
        hoverCard
        hoverCardName="Circulating Supply"
        hoverCardDescription="The amount of coins that are circulating in the market and are tradeable by the public. It is comparable to looking at shares readily available in the market (not held & locked by insiders, governments)."
      />
    );
    const formattedDataRow = screen.getByText('Circulating Supply');
    expect(formattedDataRow).toMatchSnapshot();
  });
  it('Should render Total Supply correctly', () => {
    render(
      <FormattedDataRow
        rowName="Total Supply"
        rowPrice={10000}
        hoverCard
        hoverCardName="Total Supply = Onchain supply - burned tokens"
        hoverCardDescription="The amount of coins that have already been created, minus any coins that have been burned (removed from circulation). It is comparable to outstanding shares in the stock market."
      />
    );
    const formattedDataRow = screen.getByText('Total Supply');
    expect(formattedDataRow).toMatchSnapshot();
  });
  it('Should render Max Supply correctly', () => {
    render(
      <FormattedDataRow
        rowName="Max Supply"
        rowPrice={10000}
        hoverCard
        hoverCardName="Max Supply = Theoretical maximum as coded"
        hoverCardDescription="The maximum number of coins coded to exist in the lifetime of the cryptocurrency. It is comparable to the maximum number of issuable shares in the stock market."
      />
    );
    const formattedDataRow = screen.getByText('Max Supply');
    expect(formattedDataRow).toMatchSnapshot();
  });
});
