import useMenus from '@/hooks/useMenus';
import useMenuOrder from '@/hooks/useMenuOrder';
import { UserContext } from '@/pages/floormap';
import { Col, List, Row, Spin } from 'antd';
import { useContext, VFC } from 'react';
import { ItemInterface, ReactSortable } from 'react-sortablejs';

const ReorderMenus: VFC = () => {
  const user = useContext(UserContext);
  const [status, order, updateOrder] = useMenuOrder(user);
  const [menus, _] = useMenus(user);
  if (status === 'loading') {
    return <Spin />;
  }
  const orderWithID = order.map((id, index) => {
    return { id: index, order: id };
  });
  const setOrderWithID = (order: ItemInterface[]) => {
    const orderWithoutId: string[] = order.map((obj) => obj.order);
    updateOrder(orderWithoutId);
  };
  return (
    <Row>
      <Col span={24} style={{ padding: '10px' }}>
        <List bordered={true}>
          <ReactSortable list={orderWithID} setList={setOrderWithID}>
            {menus.map((menu) => (
              <List.Item key={menu.ID}>{menu.menuName}</List.Item>
            ))}
          </ReactSortable>
        </List>
      </Col>
    </Row>
  );
};

export default ReorderMenus;
