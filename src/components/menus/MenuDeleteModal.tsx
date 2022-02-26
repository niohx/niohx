import useMenus from '@/hooks/useMenus';
import { Modal } from 'antd';
import { ReactNode, useContext, VFC } from 'react';
import { CurrentMenu } from './MenuCard';

type FloorDeleteModalProps = {
  visible: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  children?: ReactNode;
};

const FloorDeleteModal: VFC<FloorDeleteModalProps> = (props) => {
  const currentMenu = useContext(CurrentMenu);
  const [_, menuController] = useMenus(currentMenu!.user);
  const deleteCurrentMenu = async () => {
    await menuController.delete(currentMenu!.menu);
    props.handleCancel;
  };
  return (
    <Modal
      title="消去"
      visible={props.visible}
      onOk={deleteCurrentMenu}
      onCancel={props.handleCancel}
    >
      {currentMenu!.menu.menuName}
    </Modal>
  );
};

export default FloorDeleteModal;
