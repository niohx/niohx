import useGeneralTerms from '@/hooks/useGeneralTerms';
import { User } from 'firebase/auth';
import { ReactNode, VFC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  user: User;
  children?: ReactNode;
};

const GeneralTermsRenderer: VFC<Props> = (props) => {
  const [terms, setTerms] = useGeneralTerms(props.user);
  return (
    <ReactMarkdown children={terms.generalTerms!} remarkPlugins={[remarkGfm]} />
  );
};

export default GeneralTermsRenderer;
