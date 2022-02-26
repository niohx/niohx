import { Menu, Typography } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useState } from 'react';
import { Link, useLocation } from 'umi';

const MyHeader: React.VFC = (props) => {
  const location = useLocation();

  return (
    <Header style={{ padding: '20px' }}>
      <Typography style={{ float: 'left' }}>管理WEB</Typography>
      <Menu selectedKeys={[location.pathname]} mode="horizontal">
        <Menu.Item key="/main">
          <Link to="/main">Top</Link>
        </Menu.Item>
        <Menu.Item key="main/generalterms">
          <Link to="/main/generalterms">宿泊約款</Link>
        </Menu.Item>
        <Menu.Item key="/main/floormap">
          <Link to="/main/floormap">フロア管理</Link>
        </Menu.Item>
        <Menu.Item key="/main/menus">
          <Link to="/main/menus">メニュー管理</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default MyHeader;
