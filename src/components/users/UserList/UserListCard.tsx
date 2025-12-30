import { Card, Avatar, Button, Popconfirm, Typography, Flex } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import type { User } from '../../../api';
import styles from './UserList.module.css';

const { Text } = Typography;

interface UserCardProps {
  user: User;
  onDelete?: (id: number) => void;
}

export const UserListCard = ({ user, onDelete }: UserCardProps) => {
  return (
    <Card
      className={styles.card}
      actions={[
        <Popconfirm
          key="delete"
          title="¿Eliminar contacto?"
          description="Esta acción no se puede deshacer"
          onConfirm={() => onDelete?.(user.id)}
          okText="Eliminar"
          cancelText="Cancelar"
          okButtonProps={{ danger: true }}
        >
          <Button type="text" icon={<DeleteOutlined />} danger>
            Eliminar
          </Button>
        </Popconfirm>,
      ]}
    >
      <Flex vertical gap={12}>
        <Flex gap={12} align="center">
          <Avatar size={48} src={user.photo} icon={<UserOutlined />} />
          <Text strong className={styles.cardTitle}>
            {user.name}
          </Text>
        </Flex>
        <Text type="secondary">{user.description}</Text>
      </Flex>
    </Card>
  );
};
