import { MantineProvider } from '@mantine/core';
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

const MantineTestProvider = ({ children }: { children: React.ReactNode }) => {
  return <MantineProvider>{children}</MantineProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: MantineTestProvider, ...options });

export * from '@testing-library/react';
export { customRender as render };