import {
  Table, 
  Text, 
  UnstyledButton, 
  Group, 
  Center, 
  rem 
} from "@mantine/core";
import {IconChevronUp, IconChevronDown, IconSelector} from "@tabler/icons-react";

interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort?: () => void;
};

export const SortedTableHeader = ({ children, reversed, sorted, onSort }: ThProps) => {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th>
      <UnstyledButton onClick={onSort}>
        <Group>
          <Center>
            <Text fw={500} fz="sm">
              {children}
            </Text>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}