import { Alert, AlertVariant, MantineColor, MantineRadius } from '@mantine/core';
import {
  IconHelp,
  IconExclamationCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoHexagon,
} from '@tabler/icons-react';
import styles from './index.module.css';
import cn from 'classnames';

const alertIcons = {
  custom: <IconHelp size={2} />,
  error: <IconExclamationCircle size={2} />,
  warning: <IconAlertTriangle size={2} />,
  info: <IconInfoHexagon size={2} />,
  success: <IconCircleCheck size={2} />,
};

interface Props {
  variant?: AlertVariant;
  color?: MantineColor;
  type?: 'custom' | 'error' | 'warning' | 'info' | 'success' | 'alert';
  title?: string;
  messageBody?: string;
  withCloseButton?: boolean;
  radius?: MantineRadius | number;
  onClose?: () => void;
  className?: string;
}

export const AlertMessage = ({
  variant = 'light',
  color,
  type = 'custom',
  title,
  messageBody,
  onClose,
  withCloseButton = false,
  className,
}: Props) => {
  const Icon = alertIcons[type];
  return (
    <Alert
      className={cn(styles?.['alert'], className)}
      variant={variant}
      color={color}
      title={title}
      icon={Icon}
      onClose={onClose}
      withCloseButton={withCloseButton}
    >
      {messageBody}
    </Alert>
  );
};
