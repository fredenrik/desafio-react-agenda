import { useEffect, useState } from 'react';
import { Layout, Typography, Space, message, Button, Flex, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SearchBar } from '../../components/common/SearchBar';
import { UserList } from '../../components/users/UserList';
import { UserDrawer } from '../../components/users/UserDrawer';
import { useUsersPagination, useDeleteUser } from '../../hooks';
import { usePagination, useSearch } from '../../hooks';
import { useQueryParams } from '../../hooks/useQueryParams';
import styles from './UsersPage.module.css';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

/**
 * Página principal que muestra la lista de usuarios con funcionalidades de:
 * - Búsqueda y filtrado
 * - Paginación
 * - Eliminación de usuarios
 * - Apertura de formulario para crear/editar usuarios
 *
 * @component
 *
 * @see useQueryParams Para el manejo de parámetros de URL
 * @see useUsersPagination Para la obtención paginada de usuarios
 */

export const UsersPage = () => {
  const { getParam, getNumberParam, setParams } = useQueryParams();

  // Leemos página y búsqueda de la URL (para poder compartir enlaces)
  const pageFromUrl = getNumberParam('page', 1);
  const searchFromUrl = getParam('search', '');

  const { users, loading, fetchUsers } = useUsersPagination();
  const { deleteUser, loading: deleting } = useDeleteUser();
  const { pagination, goToPage, setTotal } = usePagination(pageFromUrl);
  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useSearch(searchFromUrl, 500);
  const [messageApi, contextHolder] = message.useMessage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, []);

  // Al buscar algo nuevo, volvemos a la página 1
  useEffect(() => {
    if (debouncedSearchTerm !== searchFromUrl) {
      goToPage(1);
    }
  }, [debouncedSearchTerm]);

  // Traemos usuarios cada vez que cambia la página o el texto de búsqueda
  useEffect(() => {
    const loadUsers = async () => {
      const response = await fetchUsers(
        pagination.current,
        pagination.pageSize,
        debouncedSearchTerm
      );
      if (response) {
        setTotal(response.total); // Actualizamos el total para la paginación
      }
    };
    loadUsers();
  }, [pagination.current, debouncedSearchTerm]);

  // Mantenemos la URL sincronizada (para poder copiar el link)
  useEffect(() => {
    setParams({
      page: pagination.current,
      search: debouncedSearchTerm,
    });
  }, [pagination.current, debouncedSearchTerm]);

  useEffect(() => {
    document.title = debouncedSearchTerm
      ? `Búsqueda: ${debouncedSearchTerm} - Agenda Previred`
      : 'Mi agenda de contactos laboral - Agenda Previred';
  }, [debouncedSearchTerm]);

  const handlePageChange = (page: number) => {
    goToPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    const result = await deleteUser(id);
    if (result.success) {
      messageApi.open({
        type: 'success',
        content: 'Contacto eliminado exitosamente',
      });
      await fetchUsers(pagination.current, pagination.pageSize, debouncedSearchTerm);
    } else {
      messageApi.open({
        type: 'error',
        content: result.error?.message || 'Error al eliminar contacto',
      });
    }
  };

  const handleAddContact = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleCreateSuccess = async () => {
    // Recargamos para mostrar el nuevo contacto
    await fetchUsers(pagination.current, pagination.pageSize, debouncedSearchTerm);
  };

  return (
    <Layout className={styles.layout}>
      {contextHolder}
      <Header className={styles.header}>
        <div className={styles.headerContent}>
          <Title level={2} style={{ margin: 0 }}>
            Agenda Previred - Mi agenda de contactos laboral
          </Title>
          <Paragraph style={{ margin: '8px 0 0 0' }}>
            Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos
            y eliminar contactos no deseados.
          </Paragraph>
        </div>
      </Header>

      <Content className={styles.content}>
        <div className={styles.container}>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Flex justify="flex-start">
              <Button
                type="primary"
                icon={<PlusOutlined style={{ fontSize: '20px' }} />}
                onClick={handleAddContact}
              >
                Agregar Contacto
              </Button>
            </Flex>

            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar contactos..."
            />

            <Divider style={{ margin: 0 }} />

            <UserList
              users={users}
              loading={loading || deleting}
              onDeleteUser={handleDelete}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                onChange: handlePageChange,
              }}
            />
          </Space>
        </div>
      </Content>

      <UserDrawer open={drawerOpen} onClose={handleDrawerClose} onSuccess={handleCreateSuccess} />
    </Layout>
  );
};
