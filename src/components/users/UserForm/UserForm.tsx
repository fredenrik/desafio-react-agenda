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

/**
 * Formulario para crear un nuevo usuario
 *
 * Las validaciones han sio abstraidas en utils/validations.ts, para tener una lectura
 * más limpia de las reglas de validacion, asi como la posibilidad de extensión de nuevas reglas
 *
 * @param props - Props del componente
 * @param props.form - Instancia del formulario de Ant Design
 * @param props.onSuccess - Callback al crear exitosamente
 */
export const UserForm = ({ form, onSuccess }: UserFormProps) => {
  const { createUser } = useCreateUser();

  const handleSubmit = async (values: CreateUserData) => {
    const result = await createUser(values);

    if (result.success) {
      message.success('Contacto creado exitosamente');
      form.resetFields();
      onSuccess?.();
    } else {
      message.error(result.error?.message || 'Error al crear contacto');
    }
  };

  return (
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
  );
};
