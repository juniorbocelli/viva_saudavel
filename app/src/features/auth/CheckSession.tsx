import React from 'react';
import BackDrop from '../../ui/components/BackDrop';

import { useAuth } from '../auth/context';

interface ICheckSessionProps {
  children: React.ReactElement;
};

const CheckSession: React.FC<ICheckSessionProps> = ({ children }) => {
  const { checkSession, isCheckingSession } = useAuth();

  React.useEffect(() => {
    checkSession();
  }, []);

  return isCheckingSession ? <BackDrop open={true} /> : children;
};

export default React.memo(CheckSession);