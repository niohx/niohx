import { Button } from 'antd';
import { ReactNode, VFC } from 'react';
import { useAuth } from 'reactfire';
import MyFooter from './Footer';
import MyHeader from './Header';

interface Props {
  children: ReactNode;
}

const Skelton: VFC<Props> = (props) => {
  const children = props.children!;
  console.log('skelton..');
  const auth = useAuth();
  return (
    <div style={{ padding: '10px' }}>
      <MyHeader />
      {children}
      <Button
        onClick={async () => {
          await auth.signOut();
        }}
      >
        logout
      </Button>
      <MyFooter />
    </div>
  );
};

export default Skelton;
