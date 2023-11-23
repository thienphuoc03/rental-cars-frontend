'use client';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { useAppDispatch } from '@/stores/hooks';
import { statusApiM, statusApiReducer } from '@/stores/reducers/statusAPI';

const ProviderStore = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const statusApiMessage = useSelector(statusApiM()).statusApi;

  useEffect(() => {
    if (statusApiMessage && Object.values(statusApiMessage)[0]) {
      (toast as any)[`${Object.keys(statusApiMessage)[0]}`](
        `${Object.values(statusApiMessage)[0]}`,
      );

      dispatch(statusApiReducer.actions.resetMessage());
    }
  }, [dispatch, statusApiMessage]);
  return <div>{children}</div>;
};

export default ProviderStore;
