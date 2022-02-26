import { Button } from 'antd';
import { VFC } from 'react';
import { Link } from 'umi';

const NotFound: VFC = () => (
  <Button>
    <Link to="/login">Not found!1!!</Link>
  </Button>
);

export default NotFound;
