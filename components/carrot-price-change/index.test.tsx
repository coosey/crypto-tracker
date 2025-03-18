import '@testing-library/react';
import { CarrotPriceChange } from '.';
import { render, screen } from '@libs/utils/mantineTestUtil';

function expectComponentInDocument(priceComponent: HTMLElement) {
  expect(priceComponent).toBeInTheDocument();
};

function expectIconToHaveClass(carrotIcon: HTMLElement, expectedIcon: string) {
  expect(carrotIcon).toHaveClass(expectedIcon);
};

function CarrotPriceComponent(testPrice: number) {
  return <CarrotPriceChange price={testPrice} data-testid="carrot-price" />
};

describe('CarrotPriceChange Component', () => {
  it('renders component correctly', () => {
    render(CarrotPriceComponent(0.5));
    const carrotComponent = screen.getByTestId('carrot-price');
    const carrotIcon = screen.getByTestId('carrot-icon');
    expectComponentInDocument(carrotComponent);
    expectIconToHaveClass(carrotIcon, 'tabler-icon-caret-up-filled');
  });
  it('renders component correctly with null price', () => {
    render(CarrotPriceComponent(null));
    const carrotComponent = screen.getByTestId('carrot-price');
    expectComponentInDocument(carrotComponent);
    expect(carrotComponent).toHaveTextContent('-');
  });
  it('renders component correctly with negative price', () => {
    render(CarrotPriceComponent(-0.5));
    const carrotComponent = screen.getByTestId('carrot-price');
    const carrotIcon = screen.getByTestId('carrot-icon');
    expect(carrotComponent).toHaveClass('price_red');
    expectComponentInDocument(carrotComponent);
    expectIconToHaveClass(carrotIcon, 'tabler-icon-caret-down-filled');
  });
  it('renders component correctly with positive price', () => {
    render(CarrotPriceComponent(0.5));
    const carrotComponent = screen.getByTestId('carrot-price');
    const carrotIcon = screen.getByTestId('carrot-icon');
    expect(carrotComponent).toHaveClass('price_green');
    expectComponentInDocument(carrotComponent);
    expectIconToHaveClass(carrotIcon, 'tabler-icon-caret-up-filled');
  });
});