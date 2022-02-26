import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { ReactNode, useContext, useEffect, useState, VFC } from 'react';
import { CurrentMenu } from './MenuCard';

type Props = {
  children?: ReactNode;
};

const ImageSelector: VFC<Props> = (props) => {
  const [preview, setPreview] = useState('');
  const currentMenu = useContext(CurrentMenu);

  useEffect(() => {
    if (currentMenu!.file != null) {
      currentMenu!.setFile(currentMenu!.file);
    }
  });
  const onRemove = () => {
    currentMenu!.setFile(undefined);
    currentMenu!.setMenu({ ...currentMenu!.menu, hasImage: false });
    setPreview('');
  };
  return (
    <div>
      <img src={preview} width="100px" />
      <br />

      <Upload
        beforeUpload={(file) => {
          currentMenu!.setFile(file);
          currentMenu!.setMenu({ ...currentMenu!.menu, hasImage: true });
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
