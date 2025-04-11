import '@testing-library/react';
import { render, screen, fireEvent, act } from 'libs/utils/mantineTestUtil';
import { AlertProvider, useAlertMessage } from 'libs/context/alert.context';
import React from 'react';

// Mock icons
jest.mock('@tabler/icons-react', () => ({
  IconHelp: () => 'HelpIcon',
  IconExclamationCircle: () => 'ExclamationIcon',
  IconAlertTriangle: () => 'WarningIcon',
  IconInfoHexagon: () => 'InfoIcon',
  IconCircleCheck: () => 'SuccessIcon',
}));

// Test component to add alerts
const TestComponent = ({ alert }) => {
  const { addAlert } = useAlertMessage();
  return (
    <button onClick={() => addAlert(alert)} data-testid="add-alert-button">
      Add Alert
    </button>
  );
};

function renderTestComponent(testAlertData) {
  return render(
    <AlertProvider>
      <TestComponent alert={testAlertData} />
    </AlertProvider>
  );
}

function fireEventOnButton() {
  act(() => {
    fireEvent.click(screen.getByTestId('add-alert-button'));
  });
}

describe('AlertMessage Component', () => {
  // Mock alert
  const testAlert = {
    type: 'warning',
    color: 'yellow',
    variant: 'light',
    messageBody: 'Test Message',
    timeout: 5000,
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders correctly and shows alert when added', async () => {
    renderTestComponent(testAlert);
    expect(screen.queryByTestId('alert-message')).not.toBeInTheDocument();
    fireEventOnButton();
    expect(screen.getByTestId('alert-message')).toBeInTheDocument();
    expect(screen.getByTestId('alert-message-body')).toHaveTextContent('Test Message');
  });

  test('removes alert when close button is clicked', () => {
    renderTestComponent(testAlert);
    fireEventOnButton();
    expect(screen.getByTestId('alert-message')).toBeInTheDocument();
  });

  test('removes alert after timeout', () => {
    renderTestComponent(testAlert);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.queryByTestId('alert-message')).not.toBeInTheDocument();
  });
});
