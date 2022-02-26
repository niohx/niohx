import FloorModel from '@/models/floor';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useFloorModels from './useFloorModels';
import useFloorOrder from './useFloorOrder';

// const useFloorMap: [FloorModel[], (floorList: FloorModel[]) => void] = () => {};
export type CRUD = {
  add: (arg?: FloorModel) => Promise<void>;
  update: (arg: FloorModel) => Promise<void>;
  delete: (arg: FloorModel) => Promise<void>;
};

function notNull<T>(item: T | null | undefined): item is T {
  return item !== null && item !== undefined;
}

export const createNewFloor = (): FloorModel => {
  return {
    ID: uuidv4(),
    createdAt: new Date(),
    floorName: 'new floor',
    hasImage: false,
  };
};

const useFloorMap = (user: User): [FloorModel[], CRUD] => {
  const [orderStatus, order, setOrder] = useFloorOrder(user);
  const [floorStatus, floors, floorController] = useFloorModels(user);
  const [floorModels, setFloorModels] = useState<FloorModel[]>([]);
  const initialzeTask = async () => {
    if (orderStatus === 'success' && floorStatus === 'success') {
      if (order == undefined) {
        console.log('create new order and floor');
        const newFloor = createNewFloor();
        await setOrder([newFloor.ID]);
        await floorController.update(newFloor);
        setFloorModels([newFloor]);
      } else {
        // console.log('reordering..');
        const floorIDs = floors.map((floor) => floor.ID);
        const orderedFloors: FloorModel[] = order
          .map((id) => {
            if (floorIDs.includes(id)) {
              return floors.filter((floor) => floor.ID == id)[0];
            }
          })
          .filter(notNull);
        // console.log('from usefloor', orderedFloors);

        setFloorModels(orderedFloors);
      }
    }
  };
  useEffect(() => {
    initialzeTask();
  }, [floors, order]);

  //CRUD
  const addFloor = async () => {
    const newFloor = createNewFloor();
    console.log('add new floor');
    const newOrder = order != null ? [...order, newFloor.ID] : [newFloor.ID];
    await setOrder(newOrder);
    await floorController.update(newFloor);
    // setFloorModels([...floors, newFloor]);
  };

  const deleteFloor = async (arg: FloorModel) => {
    const newOrder = order.filter((id) => id != arg.ID);
    console.log(newOrder);
    await setOrder(newOrder);
    await floorController.delete(arg);
    const newFloors = floorModels.map((floormodel) => {
      if (floormodel.ID != arg.ID) {
        return floormodel;
      } else {
        return null;
      }
    });

    setFloorModels(newFloors.filter(notNull));
  };
  const updateFloor = async (arg: FloorModel) => {
    await floorController.update(arg);
    // setFloorModels([...floors]);
  };
  return [
    floorModels,
    { add: addFloor, update: updateFloor, delete: deleteFloor } as CRUD,
  ];
};

export default useFloorMap;
