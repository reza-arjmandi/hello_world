import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import Settings1 from 
    '../../../../logged_in/components/dashboard/Settings1';

export default {
    component: Settings1,
    title: 'LoggedIn/components/dashboard/Settings1',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/dashboard/Settings1', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <Settings1
          />
        </div>
    )})