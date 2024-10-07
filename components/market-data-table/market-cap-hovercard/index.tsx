import { Group, Text, HoverCard } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

interface MarketCapHoverCardProps {
  groupStyle?: string;
  infoStyle?: string;
}

export const MarketCapHoverCard = ({
  groupStyle, 
  infoStyle
}: MarketCapHoverCardProps) => {
  return (
    <Group justify="center" className={groupStyle}>
      <HoverCard width={280} shadow="md">
        <HoverCard.Target>
          <IconInfoCircle className={infoStyle} />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="xs">
            The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
          </Text>
          <Text size="xs" mt="md">
            Market Cap = Current Price x Circulating Supply.
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  )
};