import React from 'react';
import { useSnackbar } from 'notistack';

export default function Notification(
    {message, type}) {

  const { enqueueSnackbar } = useSnackbar();

  if(message) {
    enqueueSnackbar(message, { variant: type });
  }

  return (
      <div>
      </div>
  );
}
