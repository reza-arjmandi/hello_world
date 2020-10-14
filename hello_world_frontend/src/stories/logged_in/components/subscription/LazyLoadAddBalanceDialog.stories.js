import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import LazyLoadAddBalanceDialog from 
    '../../../../logged_in/components/subscription/LazyLoadAddBalanceDialog';

export default {
    component: LazyLoadAddBalanceDialog,
    title: 'LoggedIn/components/subscription/LazyLoadAddBalanceDialog',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/subscription/LazyLoadAddBalanceDialog', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <LazyLoadAddBalanceDialog 
            open={true}
          />
        </div>
    )})