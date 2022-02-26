import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { ReactNode, useContext, useEffect, useState, VFC } from 'react';
import { CurrentFloor } from './FloorCard';

type Props = {
  children?: ReactNode;
};

const ImageSelector: VFC<Props> = (props) => {
  const [preview, setPreview] = useState('');
  const currentFloor = useContext(CurrentFloor);

  useEffect(() => {
    if (currentFloor!.file != null) {
      currentFloor!.setFile(currentFloor!.file);
    }
  });
  const onRemove = () => {
    currentFloor!.setFile(undefined);
    currentFloor!.setFloor({ ...currentFloor!.floor, hasImage: false });
    setPreview('');
  };
  return (
    <div>
      <img src={preview} width="100px" />
      <br />

      <Upload
        beforeUpload={(file) => {
          currentFloor!.setFile(file);
          currentFloor!.setFloor({ ...currentFloor!.floor, hasImage: true });
          setPreview(window.URL.createObjectURL(file));
        }}
        maxCount={1}
        onRemove={onRemove}
      >
        <Button icon={<UploadOutlined />}>click to upload</Button>
      </Upload>
    </div>
  );
};

export default ImageSelector;
