import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import Settings2 from 
    '../../../../logged_in/components/dashboard/Settings2';

export default {
    component: Settings2,
    title: 'LoggedIn/components/dashboard/Settings2',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/dashboard/Settings2', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <Settings2
          />
        </div>
    )})