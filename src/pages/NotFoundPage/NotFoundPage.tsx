import { Result, Button, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from '../UsersPage/UsersPage.module.css';

const { Content } = Layout;

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Content className={styles.content}>
        <Result
          status="404"
          title="404"
          subTitle="Lo sentimos, la página que buscas no existe."
          extra={
            <Button type="primary" onClick={() => navigate('/contacts')}>
              Volver a Contactos
            </Button>
          }
        />
      </Content>
    </Layout>
  );
};
