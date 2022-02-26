import { User } from '@firebase/auth';
import { Button, Dropdown, Menu, Spin } from 'antd';
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDoc,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { ReactNode, useEffect, VFC } from 'react';
import {
  useAuth,
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
  useSigninCheck,
  useUser,
} from 'reactfire';
import { history, Link, Redirect } from 'umi';
import { signIn, signOut } from './login';
interface Props {
  user: User;
  children?: ReactNode;
}

const BurritoApp: VFC<Props> = (props) => {
  console.log('app starts');

  const { status, data: signInCheckResult } = useSigninCheck();

  switch (status) {
    case 'loading':
      return <Spin />;
    case 'error':
      return <p>err</p>;
    case 'success':
      return signInCheckResult.user != null ? (
        <BurritoAppChild user={signInCheckResult.user} />
      ) : (
        <p>noooo!</p>
      );
  }
};

const BurritoAppChild: VFC<Props> = (props) => {
  //読み込み
  const firestore = useFirestore();
  const burritoRef = doc(firestore, 'user', 'yoaaaa');
  getDoc(burritoRef).then((snapshot) => {
    if (snapshot.exists()) {
      console.log('snapshot found!!!!!!!!');
    } else {
      console.log('snapshot not found');
    }
  });
  const { status, data } = useFirestoreDocData(burritoRef);
  const auth = useAuth();
  //書き込み

  const setBurrito = (event: boolean) => {
    setDoc(burritoRef, { yummy: event });
  };
  // easily check the loading status
  if (status === 'loading') {
    return <Spin />;
  }
  if (status === 'error') {
    return <p>nooooo</p>;
  }
  console.log(data == null);
  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={(e) => {
          setBurrito(true);
        }}
      >
        yummy
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={async () => {
          await setBurrito(false);
        }}
      >
        bad
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <p>current user is {props.user.uid}</p>\
      <Link to="/main/works">works</Link>
      <Button
        onClick={async () => {
          await signOut(auth);
        }}
      >
        sign out
      </Button>
      <p>set burrito</p>
      <Dropdown overlay={menu} trigger={['click']}>
        <a
          className="ant-dropdown-link"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Click me to select the burrito is ..
        </a>
      </Dropdown>
      ,<p>The burrito is {data?.yummy ? 'good' : 'bad'}!</p>
    </>
  );
};

export default BurritoApp;
