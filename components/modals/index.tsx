import { MantineSize, Modal } from '@mantine/core';

export interface ModalProps {
  opened: boolean;
  onClose: () => void;
  withCloseButton?: boolean;
}

interface ModalWithChildren {
  modalHeader?: React.ReactNode;
  modalBody?: React.ReactNode;
  modalFooter?: React.ReactNode;
}

interface Props {
  children?: ModalWithChildren;
  className?: string;
  size?: MantineSize;
  title?: string;
  radius?: MantineSize;
}

export const ModalComponent = ({
  className,
  opened,
  onClose,
  withCloseButton = true,
  size = 'sm',
  title,
  radius = 'md',
  children,
}: Props & ModalProps) => {
  return (
    <Modal
      title={title}
      className={className}
      opened={opened}
      onClose={onClose}
      withCloseButton={withCloseButton}
      size={size}
      radius={radius}
      centered
    >
      {children?.modalHeader}
      {children?.modalBody}
      {children?.modalFooter}
    </Modal>
  );
};
