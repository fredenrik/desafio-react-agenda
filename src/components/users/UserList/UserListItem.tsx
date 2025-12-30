import { Row, Col, Avatar, Button, Popconfirm, Typography, Flex, Divider } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import type { User } from '../../../api';
import styles from './UserList.module.css';

const { Text } = Typography;

const LAYOUT_COLS = {
  NAME: 8,
  DESCRIPTION: 12,
  ACTIONS: 4,
} as const;

interface UserListItemProps {
  user: User;
  showDivider: boolean;
  onDelete?: (id: number) => void;
}

export const UserListItem = ({ user, showDivider, onDelete }: UserListItemProps) => {
  return (
    <>
      <Row className={styles.row}>
        <Col span={LAYOUT_COLS.NAME} className={styles.col}>
          <Flex gap={16} align="center">
            <Avatar size={64} src={user.photo} icon={<UserOutlined />} />
            <span style={{ color: '#1890ff', fontSize: '16px' }}>{user.name}</span>
          </Flex>
        </Col>
        <Col span={LAYOUT_COLS.DESCRIPTION} className={styles.col}>
          <Text>{user.description}</Text>
        </Col>
        <Col span={LAYOUT_COLS.ACTIONS} className={styles.colCenter}>
          <Popconfirm
            title="¿Eliminar contacto?"
            description="Esta acción no se puede deshacer"
            onConfirm={() => onDelete?.(user.id)}
            okText="Eliminar"
            cancelText="Cancelar"
            okButtonProps={{ danger: true }}
          >
            <Button type="text" icon={<DeleteOutlined className={styles.listIconButton} />} />
          </Popconfirm>
        </Col>
      </Row>

      {showDivider && <Divider className={styles.listDivider} />}
    </>
  );
};
