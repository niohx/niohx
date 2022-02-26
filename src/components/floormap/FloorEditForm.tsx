import FloorModel from '@/models/floor';
import { Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { ReactNode, useContext, useEffect, VFC } from 'react';
import ImageSelector from './ImageSelector';
import { CurrentFloor } from './FloorCard';

type Props = {
  children?: ReactNode;
};
const FloorEditForm: VFC<Props> = (props) => {
  const currentFloor = useContext(CurrentFloor);
  const [form] = useForm();
  useEffect(() => {
    if (currentFloor!.floor != null) {
      form.setFieldsValue({
        floorName: currentFloor!.floor.floorName,
        description: currentFloor!.floor.description,
      });
    }
  }, []);

  const onChange = () => {
    const hasImage =
      currentFloor!.file != null || currentFloor!.floor.hasImage ? true : false;
    const targetModel: FloorModel = {
      ...currentFloor!.floor,
      floorName: form.getFieldValue('floorName') ?? '',
      description: form.getFieldValue('description') ?? '',
      hasImage: hasImage,
    };
    console.log('target from editform', targetModel);
    currentFloor!.setFloor(targetModel);
  };

  return (
    <Form
      name="floorEditForm"
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onChange={onChange}
    >
      <Form.Item name="floorName" rules={[{ required: true }]} label="フロア名">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="説明">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="imageURL" label="画像">
        <ImageSelector />
      </Form.Item>
    </Form>
  );
};
export default FloorEditForm;
