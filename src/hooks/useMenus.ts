import MenuModel from '@/models/menu';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useMenuModels from './useMenuModels';
import useMenuOrder from './useMenuOrder';

// const useMenus: [MenuModel[], (floorList: MenuModel[]) => void] = () => {};
export type CRUD = {
  add: (arg?: MenuModel) => Promise<void>;
  update: (arg: MenuModel) => Promise<void>;
  delete: (arg: MenuModel) => Promise<void>;
};

function notNull<T>(item: T | null | undefined): item is T {
  return item !== null && item !== undefined;
}

export const createNewMenu = (): MenuModel => {
  return {
    ID: uuidv4(),
    createdAt: new Date(),
    menuName: 'new menu',
    hasImage: false,
  };
};

const useMenus = (user: User): [MenuModel[], CRUD] => {
  const [orderStatus, order, setOrder] = useMenuOrder(user);
  const [menuStatus, menus, menuController] = useMenuModels(user);
  const [menuModels, setMenuModels] = useState<MenuModel[]>([]);
  const initialzeTask = async () => {
    if (orderStatus === 'success' && menuStatus === 'success') {
      // console.log('from useMenus', order);
      // console.log('from useMenus , FloorModels is..', menus);
      if (order == undefined) {
        console.log('create new order and floor');
        const newMenu = createNewMenu();
        await setOrder([newMenu.ID]);
        await menuController.update(newMenu);
        setMenuModels([newMenu]);
      } else {
        // console.log('reordering..');
        const menuIDs = menus.map((floor) => floor.ID);
        const orderedMenus: MenuModel[] = order
          .map((id) => {
            if (menuIDs.includes(id)) {
              return menus.filter((floor) => floor.ID == id)[0];
            }
          })
          .filter(notNull);
        // console.log('from usefloor', orderedMenus);

        setMenuModels(orderedMenus);
      }
    }
  };
  useEffect(() => {
    initialzeTask();
  }, [order, menus]);

  //CRUD
  const addMenu = async () => {
    const newMenu = createNewMenu();
    console.log('add new floor');
    await setOrder([...order, newMenu.ID]);
    await menuController.update(newMenu);
    // setMenuModels([...menus, newMenu]);
  };

  const deleteMenu = async (arg: MenuModel) => {
    const newOrder = order.filter((id) => id != arg.ID);
    console.log(newOrder);
    await setOrder(newOrder);
    await menuController.delete(arg);
    const newMenus = menuModels.map((menumodel) => {
      if (menumodel.ID != arg.ID) {
        return menumodel;
      } else {
        return null;
      }
    });

    setMenuModels(newMenus.filter(notNull));
  };
  const updateMenu = async (arg: MenuModel) => {
    await menuController.update(arg);
    // setMenuModels([...menus]);
  };
  return [
    menuModels,
    { add: addMenu, update: updateMenu, delete: deleteMenu } as CRUD,
  ];
};

export default useMenus;
