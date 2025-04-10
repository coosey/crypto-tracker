import { Alert, AlertVariant, MantineRadius } from '@mantine/core';
import {
  IconHelp,
  IconExclamationCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoHexagon,
} from '@tabler/icons-react';
import styles from './index.module.scss';
import cn from 'classnames';
import { useAlertMessage } from 'libs/context/alert.context';

const alertIcons = {
  custom: <IconHelp size={32} />,
  error: <IconExclamationCircle size={32} />,
  warning: <IconAlertTriangle size={32} />,
  info: <IconInfoHexagon size={32} />,
  success: <IconCircleCheck size={32} />,
};

export type AlertType = 'custom' | 'error' | 'warning' | 'info' | 'success';

export type AlertColor = 'red' | 'yellow' | 'green';

export interface AlertMessageProps {
  variant?: AlertVariant;
  color?: AlertColor;
  type?: AlertType;
  title?: string;
  messageBody?: string;
  withCloseButton?: boolean;
  radius?: MantineRadius | number;
  onClose?: () => void;
  className?: string;
}

export const AlertMessage = ({ className }: AlertMessageProps) => {
  const { alerts, removeAlert } = useAlertMessage();
  return (
    <>
      {alerts?.map?.((alert) => {
        const alertIndex = Number(alert?.id);
        console.log(alertIndex);
        return (
          <div key={alert?.id}>
            <Alert
              style={{ marginTop: `${alertIndex > 1 ? alertIndex + 2 : 0}rem` }} // Adjust margin based on alert ID
              key={alert?.id}
              className={cn(styles?.['alert'], className)}
              variant={alert?.variant}
              color={alert?.color}
              title={alert?.title}
              icon={alertIcons[alert?.type]}
              onClose={() => removeAlert(alert.id)}
              withCloseButton
            >
              {alert?.messageBody}
            </Alert>
          </div>
        );
      })}
    </>
  );
};
