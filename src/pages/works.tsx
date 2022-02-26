import { Button } from 'antd';
import { doc } from 'firebase/firestore';
import { FC, ReactNode, VFC } from 'react';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { Link } from 'umi';

interface Props {
  children?: ReactNode;
}

const Works: VFC<Props> = (props) => {
  console.log('yeaaa');
  return <p>some yes</p>;
};

export default Works;
