import { Drawer, Button, Space, Form, Flex } from 'antd';
import { useResponsive } from '../../../context';
import { UserForm } from '../UserForm';
import type { CreateUserData } from '../../../api';
import { SubmitButton } from '../../common/SubmitButton';

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
          paddingBottom: isMobile ? 0 : 80,
        },
      }}
      extra={
        !isMobile && (
          <Space>
            <Button onClick={handleCancel}>Cancelar</Button>
            <SubmitButton onClick={handleSubmit} form={form}>
              Guardar
            </SubmitButton>
          </Space>
        )
      }
      footer={
        isMobile && (
          <div style={{ textAlign: 'center' }}>
            <Flex justify={'center'} align={'center'} gap={8}>
              <Button onClick={handleCancel} size={'large'} block>
                Cancelar
              </Button>
              <SubmitButton onClick={handleSubmit} form={form} size={'large'} block>
                Guardar
              </SubmitButton>
            </Flex>
          </div>
        )
      }
    >
      <UserForm form={form} onSuccess={handleSuccess} />
    </Drawer>
  );
};
