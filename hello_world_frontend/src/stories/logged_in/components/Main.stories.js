import React from 'react';
import { Fragment, Suspense, lazy } from "react";

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";
import persons from "../../dummy_data/persons";

import Main from 
    '../../../logged_in/components/Main';
const LoggedInComponent = lazy(() => import("../../../logged_in/components/Main"));

export default {
    component: Main,
    title: 'LoggedIn/components/Main',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/Main', module)
    .addDecorator(StoryRouter())
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <Suspense fallback={<Fragment />}>
              <LoggedInComponent
                persons={persons}
              />
          </Suspense>
        </div>
    )})