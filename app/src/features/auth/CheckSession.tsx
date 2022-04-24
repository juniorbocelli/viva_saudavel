import React from 'react';
import BackDrop from '../../ui/components/BackDrop';

import { useAuth } from '../auth/context';

interface ICheckSessionProps {
  children: React.ReactElement;
};

const CheckSession: React.FC<ICheckSessionProps> = ({ children }) => {
  const { checkSession, loggedClient,  } = useAuth();

  React.useEffect(() => {
    checkSession();
  }, []);

  return <React.Fragment><BackDrop open={loggedClient === undefined} />{children}</React.Fragment>;
};

export default React.memo(CheckSession);