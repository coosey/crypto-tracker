import { Layout } from 'components/layout';
import {
  HeaderComponent, 
  SidebarComponent, 
  MainComponent, 
  FooterComponent
} from 'components/layout-components';
import 'styles/globals.scss';

export default function Page() {
  return (
    <Layout>
      <HeaderComponent />
      <SidebarComponent />
      <MainComponent />
      <FooterComponent />
    </Layout>
  );
}
