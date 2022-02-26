import { Row, Col, Tabs } from 'antd';
import React, { createContext, VFC } from 'react';
import { useSigninCheck } from 'reactfire';
import { UserContext } from '@/pages/floormap';
import MenuModel from '@/models/menu';
import Menus from '@/components/menus/Menus';
import ReorderMenus from '@/components/menus/ReorderMenus';
const { TabPane } = Tabs;

export const MenuContext = createContext<MenuModel>({} as MenuModel);

const MenusPage: VFC = () => {
  const { status, data: data } = useSigninCheck();
  if (status === 'success') {
    return data != null ? (
      <UserContext.Provider value={data.user!}>
        <MenusPageChild />
      </UserContext.Provider>
    ) : (
      <div>no user</div>
    );
  }
  return <div>loading.</div>;
};

const MenusPageChild: VFC = () => {
  return (
    <Row>
      <Col span={12} offset={6} style={{ padding: '10px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="メニューの追加・編集" key={1}>
            <Menus />
          </TabPane>
          <TabPane tab="メニューの並べ替え" key={2}>
            <ReorderMenus />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default MenusPage;
