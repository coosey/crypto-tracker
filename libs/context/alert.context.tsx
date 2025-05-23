import React, {
  createContext,
  ReactNode,
  useCallback,
  useRef,
  useState
} from 'react';
import { handleUseContext } from './generic.context';
import { AlertMessage, AlertMessageProps } from 'components/alert';

interface Alert extends AlertMessageProps {
  id: string;
  timeout?: number;
};

type AlertContextType = {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  removeAlert: (id: string) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const counterRef = useRef(0);

  const addAlert = useCallback((alert: Omit<Alert, 'id'>) => {
    const id = (counterRef.current++)?.toString?.();
    setAlerts((prev) => {
      const existingAlert = prev?.some?.((a) => a?.messageBody === alert?.messageBody);
      if (existingAlert) {
        return prev;
      }
      return [...prev, { ...alert, id }]
    });

    if (alert.timeout) {
      setTimeout(() => removeAlert(id), alert?.timeout);
    }
  }, []);

  const removeAlert = (id: string) => {
    setAlerts(prev => {
      const newAlerts = prev.filter(alert => alert.id !== id);
      // Reset counter if no alerts left
      if (newAlerts.length === 0) {
        counterRef.current = 0;
      }
      return newAlerts;
    });
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
      <AlertMessage />
    </AlertContext.Provider>
  );
}

export const useAlertMessage = () => handleUseContext(AlertContext, 'AlertContext');