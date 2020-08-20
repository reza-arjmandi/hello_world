import React from 'react';

import './App.css';

import Menu from './containers/Menu';
import Page from './containers/Page';
import AddResourceButton from './containers/AddResourceButton';
import AddNewResourceDialog from './containers/AddNewResourceDialog';
import Notification from './containers/Notification';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div>
      <SnackbarProvider maxSnack={3}>
      <React.Fragment>
        <Menu />
        {/* <ButtonAppBar /> */}
        <AddNewResourceDialog />
        <Page />
        <AddResourceButton />
        <Notification />
      </React.Fragment>
      </SnackbarProvider>    
    </div>
  );
}

export default App;
