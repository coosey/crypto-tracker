import { Paper, Stepper, Button } from '@mantine/core';
import { Layout } from 'components/layout';
import styles from './styles/verify.module.scss';
import { useRouter } from 'next/router';
import useResponsive from 'libs/hooks/useResponsive';

export default function VerifyPage() {
  const router = useRouter();

  const { isMobile } = useResponsive();

  return (
    <Layout hasGlobalTrend={false}>
      <div className={styles?.['verify']}>
        <h1>Thanks For Signing Up!</h1>
        <Paper 
          radius="md" 
          p="xl"
          withBorder 
          className={styles?.['container']}>
          <h3 className={styles?.['container--title']}>Just 1 More Step To Go</h3>
          <Stepper
            iconSize={isMobile ? 25 : 35} 
            active={1} 
            p="xl" 
            orientation={isMobile ? 'vertical' : 'horizontal'} 
            className={styles?.['stepper']}>
            <Stepper.Step label="Step 1" description="Create Account" />
            <Stepper.Step label="Step 2" description="Verify Email" />
          </Stepper>
          <Button onClick={() => router.push('/')}>Go Back Home</Button>
        </Paper>
      </div>
    </Layout>
  );
}