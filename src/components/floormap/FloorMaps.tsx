import useFloorMap from '@/hooks/useFloorMap';
import { FloorContext, UserContext } from '@/pages/floormap';
import { Button, Row, Col } from 'antd';
import { useContext, VFC } from 'react';
import FloorCard from './FloorCard';

const FloorMaps: VFC = () => {
  const user = useContext(UserContext);
  const [floorMap, crud] = useFloorMap(user);

  return floorMap == undefined ? (
    <Button
      onClick={async () => {
        await crud.add();
      }}
    ></Button>
  ) : (
    <>
      <Row>
        <Button onClick={async () => await crud.add()}>新規フロアの追加</Button>
      </Row>

      <div>
        {floorMap.map((floor) => {
          return (
            <FloorContext.Provider value={floor} key={floor.ID}>
              <FloorCard key={floor.ID} />
            </FloorContext.Provider>
          );
        })}
      </div>
    </>
  );
};

export default FloorMaps;
