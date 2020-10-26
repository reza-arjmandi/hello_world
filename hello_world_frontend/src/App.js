import React, { Fragment, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import './App.css';
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";

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
      </MuiThemeProvider>    
    </BrowserRouter>
  );
}

export default App;
