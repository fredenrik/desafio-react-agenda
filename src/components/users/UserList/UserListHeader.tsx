import { Row, Col, Typography } from 'antd';
import styles from './UserList.module.css';

const { Text } = Typography;

const LAYOUT_COLS = {
  NAME: 8,
  DESCRIPTION: 12,
  ACTIONS: 4,
} as const;

export const UserListHeader = () => (
  <Row className={styles.header}>
    <Col span={LAYOUT_COLS.NAME} className={styles.col}>
      <Text strong>Nombre</Text>
    </Col>
    <Col span={LAYOUT_COLS.DESCRIPTION} className={styles.col}>
      <Text strong>Descripción</Text>
    </Col>
    <Col span={LAYOUT_COLS.ACTIONS} className={styles.colCenter}>
      <Text strong>Acciones</Text>
    </Col>
  </Row>
);
