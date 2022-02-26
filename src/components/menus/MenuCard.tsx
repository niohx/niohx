import MenuModel from '@/models/menu';
import { UserContext } from '@/pages/floormap';
import { MenuContext } from '@/pages/menus';
import { Button, Card, Col, Row, Space } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { User } from 'firebase/auth';
import { createContext, ReactNode, useContext, useState, VFC } from 'react';
import MenuDeleteModal from './MenuDeleteModal';
import MenuEditModal from './MenuEditModal';
import MenuImage from './MenuImage';
type Props = {
  children?: ReactNode;
};
type CurrentMenuModel = {
  user: User;
  menu: MenuModel;
  setMenu: React.Dispatch<MenuModel>;
  file?: RcFile;
  setFile: React.Dispatch<RcFile | undefined>;
};

export const CurrentMenu = createContext<CurrentMenuModel | undefined>(
  undefined,
);

//ここまでコンテクストの作成

const FloorCard: VFC<Props> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const user = useContext(UserContext);
  const menu = useContext(MenuContext);
  const [file, setFile] = useState<RcFile>();
  const [currentMenu, setCurrentMenu] = useState<MenuModel>(menu);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };
  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };
  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  return (
    <Row key={menu.ID}>
      <Col span={24} style={{ padding: '10px' }}>
        <CurrentMenu.Provider
          value={{
            menu: currentMenu,
            user: user,
            file: file,
            setFile: setFile,
            setMenu: setCurrentMenu,
          }}
        >
          <Card
            title={menu.menuName}
            extra={
              <Space size={'middle'}>
                <Button onClick={showDeleteModal}>DELETE</Button>
                <MenuDeleteModal
                  visible={isDeleteModalVisible}
                  handleOk={hideDeleteModal}
                  handleCancel={hideDeleteModal}
                />
                <Button onClick={showModal}>EDIT</Button>
                <MenuEditModal
                  key={menu.ID}
                  visible={isModalVisible}
                  handleOk={hideModal}
                  handleCancel={hideModal}
                />
              </Space>
            }
          >
            <Row>
              <Col span={8}>
                <MenuImage />
              </Col>
              <Col span={16}>
                {menu.description ? menu.description : 'no description'}
              </Col>
            </Row>
          </Card>
        </CurrentMenu.Provider>
      </Col>
    </Row>
  );
};

export default FloorCard;
