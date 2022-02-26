import useFloorMap from '@/hooks/useFloorMap';
import useFloorOrder from '@/hooks/useFloorOrder';
import FloorModel from '@/models/floor';
import { UserContext } from '@/pages/floormap';
import { BarsOutlined } from '@ant-design/icons';
import { Card, Col, Divider, List, Row, Spin } from 'antd';
import { useContext, VFC } from 'react';
import { ItemInterface, ReactSortable } from 'react-sortablejs';

const ReorderFloorMap: VFC = () => {
  const user = useContext(UserContext);
  const [status, order, updateOrder] = useFloorOrder(user);
  const [floorModels, _] = useFloorMap(user);
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
            {floorModels.map((floor) => (
              <List.Item key={floor.ID}>{floor.floorName}</List.Item>
            ))}
          </ReactSortable>
        </List>
      </Col>
    </Row>
  );
};

export default ReorderFloorMap;
