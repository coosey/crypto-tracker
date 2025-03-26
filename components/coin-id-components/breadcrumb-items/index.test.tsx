
import { BreadCrumbItems } from '.';
import { render, screen } from 'lib/utils/mantineTestUtil';
describe('BreadCrumbItems Component', () => {
  it('Should render BreadcrumbItems Component correctly', () => {
    render(
      <BreadCrumbItems
        name="Home"
      />
    );
    const breadcrumbComponent = screen.getByText('Home Price');
    expect(breadcrumbComponent).toMatchSnapshot();
  });
  
});