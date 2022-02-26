import useFloorModels from '@/hooks/useFloorModels';

import { FloorContext, UserContext } from '@/pages/floormap';
import { Modal, Button } from 'antd';

import { ref, uploadBytes } from 'firebase/storage';
import { ReactNode, VFC, useContext } from 'react';
import { useStorage } from 'reactfire';
import { CurrentFloor } from './FloorCard';
import FloorEditForm from './FloorEditForm';

type FloorEditModalProps = {
  visible: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  children?: ReactNode;
};
//コンテクストの作成

const FloorEditModal: VFC<FloorEditModalProps> = (props) => {
  const currentFloor = useContext(CurrentFloor);
  const user = useContext(UserContext);
  const floor = useContext(FloorContext);
  const storage = useStorage();
  const imageRef = ref(storage, `${user.uid}/floor/${floor.ID}`);
  const [, , { update: updateFloor, delete: deleteFloor }] =
    useFloorModels(user);

  return (
    <Modal
      key={floor.ID}
      title="編集"
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={[
        <Button
          onClick={async () => {
            console.log('hmm..', currentFloor!.floor);
            updateFloor(currentFloor!.floor);
            if (currentFloor!.file != null) {
              console.log(currentFloor!.file);
              console.log('upload file!');
              await uploadBytes(imageRef, currentFloor!.file);
            }
            props.handleCancel!();
          }}
        >
          Submit
        </Button>,
        <Button onClick={props.handleCancel}>Cancel</Button>,
      ]}
    >
      <FloorEditForm key={floor.ID} />
    </Modal>
  );
};

export default FloorEditModal;
