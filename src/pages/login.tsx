import React, { VFC } from 'react';
import styles from './login.less';
import { history, Redirect } from 'umi';

import { useAuth, useSigninCheck, useUser } from 'reactfire';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button, Spin } from 'antd';

export const signOut = async (auth) => await auth.signOut();
export const signIn = async (auth) => {
  const provider = new GoogleAuthProvider();

  await signInWithPopup(auth, provider);
};

const SignInForm = () => {
  const auth = useAuth();

  return (
    <p>
      <Button onClick={async () => await signIn(auth)}>
        sign in with google
      </Button>
    </p>
  );
};

export const Auth: VFC = () => {
  console.log('loginpage');
  const { status, data: signInCheckResult } = useSigninCheck();
  switch (status) {
    case 'error':
      return <p>err!</p>;
    case 'loading':
      return <Spin />;
    case 'success':
      console.log('success!');
      if (signInCheckResult.user != null) {
        return <Redirect to="/main" />;
      } else {
        console.log('not signed');
        return <SignInForm />;
      }
  }
};

export default Auth;
