import { List } from 'antd';
import { useResponsive } from '../../../context';
import { UserListHeader } from './UserListHeader';
import { UserListItem } from './UserListItem';
import { UserListCard } from './UserListCard';
import type { User } from '../../../api';

import styles from './UserList.module.css';

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

/**
 * Lista de usuarios con soporte responsive
 *
 * En desktop muestra una tabla horizontal con cabecera,
 * en mobile muestra tarjetas verticales
 *
 * @param props - Props del componente
 * @param props.users - Array de usuarios a mostrar
 * @param props.loading - Estado de carga
 * @param props.onDeleteUser - Callback al eliminar un usuario
 * @param props.pagination - Configuración de paginación
 */
export const UserList = ({ users, loading, onDeleteUser, pagination }: UserListProps) => {
  const { isMobile } = useResponsive();

  const paginationConfig = pagination
    ? {
        align: (isMobile ? 'center' : 'end') as 'center' | 'end',
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: pagination.onChange,
        showSizeChanger: false,
        showTotal: (total: number, range: [number, number]) =>
          !isMobile ? `${range[0]}-${range[1]} de ${total} contactos` : '',
      }
    : false;

  if (isMobile) {
    return (
      <List
        className={styles.userList}
        loading={loading}
        dataSource={users}
        locale={{ emptyText: 'No se encontraron contactos' }}
        pagination={paginationConfig}
        renderItem={user => (
          <List.Item style={{ padding: 0 }}>
            <UserListCard user={user} onDelete={onDeleteUser} />
          </List.Item>
        )}
      />
    );
  }

  return (
    <List
      className={styles.userList}
      itemLayout="horizontal"
      header={<UserListHeader />}
      loading={loading}
      dataSource={users}
      locale={{ emptyText: 'No se encontraron contactos' }}
      pagination={paginationConfig}
      renderItem={(user, index) => (
        <UserListItem user={user} showDivider={index < users.length - 1} onDelete={onDeleteUser} />
      )}
    />
  );
};
