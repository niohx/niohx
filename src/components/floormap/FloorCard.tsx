import FloorModel from '@/models/floor';
import { FloorContext, UserContext } from '@/pages/floormap';
import { Button, Card, Col, Row, Space } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { User } from 'firebase/auth';
import { createContext, ReactNode, useContext, useState, VFC } from 'react';
import FloorDeleteModal from './FloorDeleteModal';
import FloorEditModal from './FloorEditModal';
import FloorImage from './FloorImage';

type Props = {
  children?: ReactNode;
};
type CurrentFloorModel = {
  user: User;
  floor: FloorModel;
  setFloor: React.Dispatch<FloorModel>;
  file?: RcFile;
  setFile: React.Dispatch<RcFile | undefined>;
};

export const CurrentFloor = createContext<CurrentFloorModel | undefined>(
  undefined,
);

//ここまでコンテクストの作成

const FloorCard: VFC<Props> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const user = useContext(UserContext);
  const floor = useContext(FloorContext);
  const [file, setFile] = useState<RcFile>();
  const [currentFloor, setCurrentFloor] = useState<FloorModel>(floor);
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
    <Row key={floor.ID}>
      <Col span={24} style={{ padding: '10px' }}>
        <CurrentFloor.Provider
          value={{
            floor: currentFloor,
            user: user,
            file: file,
            setFile: setFile,
            setFloor: setCurrentFloor,
          }}
        >
          <Card
            title={floor.floorName}
            extra={
              <Space size={'middle'}>
                <Button onClick={showDeleteModal}>DELETE</Button>
                <FloorDeleteModal
                  visible={isDeleteModalVisible}
                  handleOk={hideDeleteModal}
                  handleCancel={hideDeleteModal}
                />
                <Button onClick={showModal}>EDIT</Button>
                <FloorEditModal
                  key={floor.ID}
                  visible={isModalVisible}
                  handleOk={hideModal}
                  handleCancel={hideModal}
                />
              </Space>
            }
          >
            <Row>
              <Col span={8}>
                <FloorImage />
              </Col>
              <Col span={16}>
                {floor.description ? floor.description : 'no description'}
              </Col>
            </Row>
          </Card>
        </CurrentFloor.Provider>
      </Col>
    </Row>
  );
};

export default FloorCard;
