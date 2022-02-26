import { Spin } from 'antd';
import { User } from 'firebase/auth';
import { ReactNode, useEffect, VFC } from 'react';
import { useAuth, useSigninCheck, useUser } from 'reactfire';
import { history, Link, Redirect } from 'umi';

interface Props {
  children?: ReactNode;
}
const AuthWrapper: VFC<Props> = (props) => {
  const { status, data: signInCheckResult } = useSigninCheck();
  if (status === 'loading') {
    return <Spin />;
  }
  if (signInCheckResult.signedIn === false) {
    console.log('redirecting to login page');
    return <Redirect to="/login" />;
  } else {
    return <div>{props.children}</div>;
  }
};
export default AuthWrapper;
