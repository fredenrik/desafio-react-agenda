import { Drawer, Button, Space, Form } from 'antd';
import { useResponsive } from '../../../context';
import { UserForm } from '../UserForm';
import type { CreateUserData } from '../../../api';

interface UserDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const UserDrawer = ({ open, onClose, onSuccess }: UserDrawerProps) => {
  const [form] = Form.useForm<CreateUserData>();
  const { isMobile } = useResponsive();

  const handleSuccess = () => {
    onClose();
    onSuccess?.();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = () => {
    form.submit();
  };

  return (
    <Drawer
      title="Agregar Nuevo Contacto"
      placement={isMobile ? 'bottom' : 'right'}
      width={520}
      height={isMobile ? '85vh' : undefined}
      onClose={handleCancel}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleSubmit} type="primary">
            Guardar
          </Button>
        </Space>
      }
    >
      <UserForm form={form} onSuccess={handleSuccess} />
    </Drawer>
  );
};
