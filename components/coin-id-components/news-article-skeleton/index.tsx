import { Card, Image, Skeleton, Space, Stack, Text } from '@mantine/core';
import styles from './index.module.scss';

export const NewsArticleSkeleton = () => {
  return (
    <Card
      className={styles?.['wrapper']}
      shadow="lg"
      padding="lg"
      radius="md"
    >
      <Card.Section>
        <Image
          className={styles?.['wrapper_image']}
          fit="contain"
          height={200}
          radius="md"
          fallbackSrc='/images/news-placeholder.jpg'
        >
          <Skeleton height={200} />
        </Image>
      </Card.Section>

      <Card.Section className={styles?.['wrapper_title']}>
        <Text className={styles?.['wrapper_titleText']} size="md" mt="md">
          <Skeleton height={20} />
        </Text>
        <Space h="md" />
        <Stack className={styles?.['wrapper_bottom']} justify="flex-end" gap={0}>
          <Text className={styles?.['source']} size="md" mt="sm">
            <Skeleton height={20} />
          </Text>
          <Text c="dimmed" size="sm">
            <Skeleton height={20} />
          </Text>
        </Stack>
      </Card.Section>
    </Card>
  )
};