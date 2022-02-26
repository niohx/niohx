import useFloorMap from '@/hooks/useFloorMap';
import useFloorModels from '@/hooks/useFloorModels';
import { Modal } from 'antd';
import { ReactNode, useContext, VFC } from 'react';
import { CurrentFloor } from './FloorCard';

type FloorDeleteModalProps = {
  visible: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  children?: ReactNode;
};

const FloorDeleteModal: VFC<FloorDeleteModalProps> = (props) => {
  const currentFloor = useContext(CurrentFloor);
  const [_, floorController] = useFloorMap(currentFloor!.user);
  const deleteCurrentFloor = async () => {
    await floorController.delete(currentFloor!.floor);
    props.handleCancel;
  };
  return (
    <Modal
      title="消去"
      visible={props.visible}
      onOk={deleteCurrentFloor}
      onCancel={props.handleCancel}
    >
      {currentFloor!.floor.floorName}
    </Modal>
  );
};

export default FloorDeleteModal;
