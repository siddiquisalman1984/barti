import { FC } from 'react';
import { styled } from '@mui/material';

import Header from '@/components/header';
import Search from './components/search';

const App: FC = () => {
  return (
    <Root>
      <Header />
      <Search />
    </Root>
  );
};

const Root = styled('div')`
  padding: 5% 2% 10vh 2%;
  width: 100%;
  min-height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
