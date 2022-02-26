import useMenus from '@/hooks/useMenus';
import { UserContext } from '@/pages/floormap';
import { MenuContext } from '@/pages/menus';
import { Button, Row, Col } from 'antd';
import { useContext, VFC } from 'react';
import MenuCard from './MenuCard';

const Menus: VFC = () => {
  const user = useContext(UserContext);
  const [menus, crud] = useMenus(user);

  return menus == undefined ? (
    <Button
      onClick={async () => {
        await crud.add();
      }}
    ></Button>
  ) : (
    <>
      <Row>
        <Button onClick={async () => await crud.add()}>
          新規メニューの追加
        </Button>
      </Row>

      <div>
        {menus.map((floor) => {
          return (
            <MenuContext.Provider value={floor} key={floor.ID}>
              <MenuCard key={floor.ID} />
            </MenuContext.Provider>
          );
        })}
      </div>
    </>
  );
};

export default Menus;
