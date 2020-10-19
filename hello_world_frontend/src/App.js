import React, { Fragment, Suspense, lazy } from "react";
import { BrowserRouter, Router,  Route, Switch } from "react-router-dom";

import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import './App.css';
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";

import Menu from './containers/Menu';
import Page from './containers/Page';

import AddResourceButton from './containers/AddResourceButton';
import AddNewResourceDialog from './containers/AddNewResourceDialog';
import LoginDialog from './containers/LoginDialog';
import Notification from './containers/Notification';
import { SnackbarProvider } from 'notistack';
import Pace from "./shared/components/Pace";

const LoggedOutComponent = lazy(() => import('./containers/logged_out/components/Main'));
const LoggedInComponent = lazy(() => import('./containers/logged_in/components/Main'));


function App() {
  return (
    <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Pace color={theme.palette.primary.light} />
      <Suspense fallback={<Fragment />}>
          <Switch>
            <Route path="/c">
              <LoggedInComponent />
            </Route>
            <Route >
              <LoggedOutComponent />
            </Route>
          </Switch>
      </Suspense>

      {/* <SnackbarProvider maxSnack={3}>
      <React.Fragment>
        <Menu />
        {/* <ButtonAppBar /> 
        <AddNewResourceDialog />
        <LoginDialog />
        <Page />
        <AddResourceButton />
        <Notification />
      </React.Fragment>
      </SnackbarProvider> */}

      </MuiThemeProvider>    
    </BrowserRouter>
  );
}

export default App;
