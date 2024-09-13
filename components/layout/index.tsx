import Container from 'components/container';
import styles from './index.module.scss';
import {
  HeaderComponent, 
  SidebarComponent, 
  MainComponent, 
  FooterComponent
} from 'components/layout-components';

interface LayoutProps {
  children?: React.ReactNode;
}

const LayoutContainer = ({children}: LayoutProps) => {
  return (
    <div className={styles['container']}>
      {children}
    </div>
  )
}

export const Layout = ({children}: LayoutProps) => {
  return (
    <Container>
      <LayoutContainer>
        <HeaderComponent />
        <SidebarComponent />
        <MainComponent>
          {children}
        </MainComponent>
        <FooterComponent />
      </LayoutContainer>
    </Container>
  )
}