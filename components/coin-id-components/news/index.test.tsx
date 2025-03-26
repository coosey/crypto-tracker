import { render } from 'libs/utils/mantineTestUtil';
import { CoinIdNews } from '.';

describe('Component News', () => {
  it('should render the component', () => {
    const { container } = render(<CoinIdNews id="bitcoin" />);
    expect(container).toBeInTheDocument();
  });
});
