import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import SideDrawer from 
    '../../../../logged_in/components/navigation/SideDrawer';

export default {
    component: SideDrawer,
    title: 'LoggedIn/components/navigation/SideDrawer',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/navigation/SideDrawer', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <SideDrawer
            open={true}
          />
        </div>
    )})