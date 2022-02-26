import MenuModel from '@/models/menu';
import { Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useContext, useEffect, VFC } from 'react';
import ImageSelector from './ImageSelector';
import { CurrentMenu } from './MenuCard';

const MenuEditForm: VFC = () => {
  const currentMenu = useContext(CurrentMenu);
  const [form] = useForm();
  useEffect(() => {
    if (currentMenu!.menu != null) {
      form.setFieldsValue({
        menuName: currentMenu!.menu.menuName,
        description: currentMenu!.menu.description,
      });
    }
  }, []);

  const onChange = () => {
    const hasImage =
      currentMenu!.file != null || currentMenu!.menu.hasImage ? true : false;
    const targetModel: MenuModel = {
      ...currentMenu!.menu,
      menuName: form.getFieldValue('menuName') ?? '',
      description: form.getFieldValue('description') ?? '',
      hasImage: hasImage,
    };
    console.log('target from editform', targetModel);
    currentMenu!.setMenu(targetModel);
  };

  return (
    <Form
      name="menuEditForm"
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onChange={onChange}
    >
      <Form.Item
        name="menuName"
        rules={[{ required: true }]}
        label="メニュー名"
      >
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
export default MenuEditForm;
