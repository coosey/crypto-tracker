import { Container, Title, Text, Button, Flex } from '@mantine/core';
import styles from './styles/404.module.scss';
import { useRouter } from 'next/router';

export default function Page404() {
  const router = useRouter();
  return (
    <Container className={styles?.['container']}>
      <Flex direction="column" align="center" justify="center">
        <Title className={styles?.['title']}>Something is not right...</Title>
        <Text c="dimmed" size="lg" ta="center">
          The page you are trying to open does not exist. You may have mistyped the address, or the
          page has been moved to another URL. If you think this is an error please contact support.
        </Text>
        <Button variant="outline" size="md" mt="xl" className={styles?.['backButton']} onClick={() => router.push('/')}>
          Go back to home page
        </Button>
      </Flex>
    </Container>
  );
};
