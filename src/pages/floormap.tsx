import FloorCard from '@/components/floormap/FloorCard';
import FloorMaps from '@/components/floormap/FloorMaps';
import ReorderFloorMap from '@/components/floormap/ReorderFloorMap';
import useFloorMap, { CRUD } from '@/hooks/useFloorMap';
import FloorModel from '@/models/floor';
import { Button, Col, Row, Tabs } from 'antd';
import { User } from 'firebase/auth';
import React, { createContext, ReactNode, useContext, VFC } from 'react';
import { useSigninCheck } from 'reactfire';
import styles from './floormap.less';
const { TabPane } = Tabs;

export const UserContext = createContext<User>({} as User);
export const FloorContext = createContext<FloorModel>({} as FloorModel);

const FloorMapPage: VFC = () => {
  const { status, data: data } = useSigninCheck();
  if (status === 'success') {
    return data != null ? (
      <UserContext.Provider value={data.user!}>
        <FloorMapPageChild />
      </UserContext.Provider>
    ) : (
      <div>no user</div>
    );
  }
  return <div>loading.</div>;
};

const FloorMapPageChild: VFC = () => {
  return (
    <Row>
      <Col span={12} offset={6} style={{ padding: '10px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="フロアの追加・編集" key={1}>
            <FloorMaps />
          </TabPane>
          <TabPane tab="フロアの並べ替え" key={2}>
            <ReorderFloorMap />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default FloorMapPage;
