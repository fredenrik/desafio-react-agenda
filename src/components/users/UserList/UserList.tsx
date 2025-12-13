import { List, Avatar, Button, Popconfirm, Row, Col, Typography, Flex, Divider } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import type { User } from '../../../api';
import styles from './UserList.module.css';

const { Text } = Typography;

const LAYOUT_COLS = {
  NAME: 8,
  DESCRIPTION: 12,
  ACTIONS: 4,
} as const;

interface UserListProps {
  users: User[];
  loading?: boolean;
  onDeleteUser?: (id: number) => void;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
}

const Header = () => (
  <Row className={styles.header}>
    <Col span={LAYOUT_COLS.NAME} className={styles.colLeft}>
      <Text strong>Nombre</Text>
    </Col>
    <Col span={LAYOUT_COLS.DESCRIPTION} className={styles.colLeft}>
      <Text strong>Descripción</Text>
    </Col>
    <Col span={LAYOUT_COLS.ACTIONS} className={styles.colCenter}>
      <Text strong>Acciones</Text>
    </Col>
  </Row>
);

export const UserList = ({ users, loading, onDeleteUser, pagination }: UserListProps) => {
  return (
    <>
      <List
        className={styles.userList}
        itemLayout="horizontal"
        header={<Header />}
        loading={loading}
        dataSource={users}
        locale={{ emptyText: 'No se encontraron contactos' }}
        pagination={
          pagination
            ? {
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                onChange: pagination.onChange,
                showSizeChanger: false,
                showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} contactos`,
              }
            : false
        }
        renderItem={(user, index) => (
          <>
            <Row className={styles.row}>
              <Col span={LAYOUT_COLS.NAME} className={styles.colLeft}>
                <Flex gap={16} align={'center'}>
                  <Avatar size={64} src={user.photo} icon={<UserOutlined />} />
                  <span style={{ color: '#1890ff', fontSize: '16px' }}>{user.name}</span>
                </Flex>
              </Col>
              <Col span={LAYOUT_COLS.DESCRIPTION} className={styles.colLeft}>
                <Text>{user.description}</Text>
              </Col>
              <Col span={LAYOUT_COLS.ACTIONS} className={styles.colCenter}>
                <Popconfirm
                  key="delete"
                  title="¿Eliminar contacto?"
                  description="Esta acción no se puede deshacer"
                  onConfirm={() => onDeleteUser?.(user.id)}
                  okText="Eliminar"
                  cancelText="Cancelar"
                  okButtonProps={{ danger: true }}
                >
                  <Button type="text" icon={<DeleteOutlined style={{ fontSize: '20px' }} />} />
                </Popconfirm>
              </Col>
            </Row>

            {index < users.length - 1 && <Divider style={{ margin: 0 }} />}
          </>
        )}
      />
    </>
  );
};
