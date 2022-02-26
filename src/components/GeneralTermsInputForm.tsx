import useGeneralTerms from '@/hooks/useGeneralTerms';
import { Button, Form, Input } from 'antd';
import { User } from 'firebase/auth';
import { ReactNode, useEffect, useState, VFC } from 'react';

interface Props {
  user: User;
  children?: ReactNode;
}
const GeneralTermsInputForm: VFC<Props> = (props) => {
  const [terms, setTerms] = useGeneralTerms(props.user);

  const [generalTermsString, setGeneralTermsString] = useState('');
  const [form] = Form.useForm();
  useEffect(() => {
    setGeneralTermsString(terms.generalTerms!);
    form.setFieldsValue({ generalterms: terms.generalTerms! });
  }, [terms]);
  const onClick = () => {
    const gTString = form.getFieldValue('generalterms');
    setTerms(gTString);
  };
  return (
    <Form
      form={form}
      name="generalterms"
      initialValues={{ generalterms: generalTermsString }}
    >
      <Form.Item name="generalterms">
        <Input.TextArea />
      </Form.Item>
      <Button onClick={onClick}>submit</Button>
    </Form>
  );
};

export default GeneralTermsInputForm;
