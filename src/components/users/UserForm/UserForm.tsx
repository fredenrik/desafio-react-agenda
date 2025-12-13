import { Form, Input, message } from 'antd';
import type { FormInstance } from 'antd';
import { useCreateUser } from '../../../hooks';
import type { CreateUserData } from '../../../api';
import { USER_VALIDATION } from '../../../utils/validations';

const { TextArea } = Input;

interface UserFormProps {
  form: FormInstance<CreateUserData>;
  onSuccess?: () => void;
}

export const UserForm = ({ form, onSuccess }: UserFormProps) => {
  const { createUser } = useCreateUser();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values: CreateUserData) => {
    const result = await createUser(values);

    if (result.success) {
      messageApi.open({
        type: 'success',
        content: 'Contacto creado exitosamente',
      });
      form.resetFields();
      onSuccess?.();
    } else {
      messageApi.open({
        type: 'error',
        content: result.error?.message || 'Error al crear contacto',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        labelCol={{ style: { fontWeight: '500' } }}
      >
        <Form.Item name="photo" label="URL Imagen de Perfil" rules={USER_VALIDATION.photo}>
          <Input placeholder="Inserte la URL de la imagen de perfil" />
        </Form.Item>
        <Form.Item name="name" label="Nombre" rules={USER_VALIDATION.name}>
          <Input placeholder="Escriba el nombre de contacto" />
        </Form.Item>
        <Form.Item name="description" label="Descripción" rules={USER_VALIDATION.description}>
          <TextArea
            rows={2}
            placeholder="Agregue la descripción del contacto"
            showCount
            maxLength={500}
          />
        </Form.Item>
      </Form>
    </>
  );
};
