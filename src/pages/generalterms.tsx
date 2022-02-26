import GeneralTermsInputForm from '@/components/GeneralTermsInputForm';
import GeneralTermsRenderer from '@/components/GeneralTermsRenderer';
import { Col, Row } from 'antd';
import { User } from 'firebase/auth';
import { ReactNode, useEffect, useReducer, useState, VFC } from 'react';
import { useSigninCheck, useUser } from 'reactfire';
import styles from './generalterms.less';

interface Props {
  user: User;
  children?: ReactNode;
}

const GeneralTermsPage: VFC = () => {
  const { status, data: data } = useSigninCheck();
  return data != null ? (
    <GeneralTermsPageChild user={data.user!} />
  ) : (
    <p>no user</p>
  );
};

const GeneralTermsPageChild: VFC<Props> = (props) => {
  return (
    <Row>
      <Col span={8} offset={3}>
        <GeneralTermsInputForm user={props.user} />
      </Col>
      <Col span={8} offset={3}>
        <GeneralTermsRenderer user={props.user} />
      </Col>
    </Row>
  );
};

export default GeneralTermsPage;
