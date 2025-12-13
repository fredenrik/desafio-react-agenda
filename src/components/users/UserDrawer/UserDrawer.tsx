import { Drawer, Button, Space, Form } from 'antd';
import { UserForm } from '../UserForm';
import type { CreateUserData } from '../../../api';

interface UserDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const UserDrawer = ({ open, onClose, onSuccess }: UserDrawerProps) => {
  const [form] = Form.useForm<CreateUserData>();

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
      width={520}
      onClose={handleCancel}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
          backgroundColor: '#f1f1f1',
        },
        header: {
          backgroundColor: '#f1f1f1',
          padding: '16px 24px',
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
