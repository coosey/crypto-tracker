import { Card, Image, Space, Stack, Text } from '@mantine/core';
import styles from './index.module.scss';

interface Props {
  title: string;
  publishedDate: string;
  url: string;
  source: string;
  urlToImg: string;
}

export const NewsArticle = ({ title, publishedDate, url, source, urlToImg }: Props) => {
  return (
    <Card
      className={styles?.['wrapper']}
      shadow="lg"
      padding="lg"
      component="a"
      radius="md"
      href={url}
      target="_blank"
    >
      <Card.Section>
        <Image
          className={styles?.['wrapper_image']}
          loading="lazy"
          fit="contain"
          height={200}
          width={100}
          radius="md"
          src={urlToImg}
          fallbackSrc="/images/news-placeholder.jpg"
          alt={title}
        />
      </Card.Section>

      <Card.Section className={styles?.['wrapper_title']}>
        <div className={styles?.['wrapper_titleText']}>
          <Text size="md" mt="md">
            {title}
          </Text>
        </div>
        <Space h="md" />
        <Stack className={styles?.['wrapper_bottom']} justify="flex-end" gap={0}>
          <Text className={styles?.['source']} size="md" mt="sm">
            {source}
          </Text>
          <Text c="dimmed" size="sm">
            About {publishedDate} hours ago
          </Text>
        </Stack>
      </Card.Section>
    </Card>
  );
};
