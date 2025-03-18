import '@testing-library/react';
import { FormattedNumber } from '.';
import { render, screen } from '../../libs/utils/mantineTestUtil';

describe('FormattedNumber', () => {
  it('renders component correctly', () => {
    render(<FormattedNumber value={0.5} />);
    const formattedNumber = screen.getByTestId('formatted-number');
    expect(formattedNumber).toBeInTheDocument();
    expect(formattedNumber).toHaveTextContent('$0.5');
  });
  it('renders component correctly with no prefix', () => {
    render(<FormattedNumber value={0.5} noPrefix />);
    const formattedNumber = screen.getByTestId('formatted-number');
    expect(formattedNumber).toBeInTheDocument();
    expect(formattedNumber).toHaveTextContent('0.5');
  });
  it('renders component correctly with negative value', () => {
    render(<FormattedNumber value={-0.5} />);
    const formattedNumber = screen.getByTestId('formatted-number');
    expect(formattedNumber).toBeInTheDocument();
    expect(formattedNumber).toHaveTextContent('-$0.5');
  })
  it('renders component correctly with large value', () => {
    render(<FormattedNumber value={1000000} />);
    const formattedNumber = screen.getByTestId('formatted-number');
    expect(formattedNumber).toBeInTheDocument();
    expect(formattedNumber).toHaveTextContent('$1,000,000');
  });
});