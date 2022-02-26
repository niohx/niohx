import useMenuModels from '@/hooks/useMenuModels';

import { UserContext } from '@/pages/floormap';
import { MenuContext } from '@/pages/menus';
import { Modal, Button } from 'antd';

import { ref, uploadBytes } from 'firebase/storage';
import { ReactNode, VFC, useContext } from 'react';
import { useStorage } from 'reactfire';
import { CurrentMenu } from './MenuCard';
import FloorEditForm from './MenuEditForm';

type MenuEditModalProps = {
  visible: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  children?: ReactNode;
};
//コンテクストの作成

const MenuEditModal: VFC<MenuEditModalProps> = (props) => {
  const currentMenu = useContext(CurrentMenu);
  const user = useContext(UserContext);
  const menu = useContext(MenuContext);
  const storage = useStorage();
  const imageRef = ref(storage, `${user.uid}/menus/${menu.ID}`);
  const [, , { update: updateMenu, delete: deleteMenu }] = useMenuModels(user);

  return (
    <Modal
      key={menu.ID}
      title="編集"
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={[
        <Button
          onClick={async () => {
            console.log('hmm..', currentMenu!.menu);
            updateMenu(currentMenu!.menu);
            if (currentMenu!.file != null) {
              console.log(currentMenu!.file);
              console.log('upload file!');
              await uploadBytes(imageRef, currentMenu!.file);
            }
            props.handleCancel!();
          }}
        >
          Submit
        </Button>,
        <Button onClick={props.handleCancel}>Cancel</Button>,
      ]}
    >
      <FloorEditForm key={menu.ID} />
    </Modal>
  );
};

export default MenuEditModal;
