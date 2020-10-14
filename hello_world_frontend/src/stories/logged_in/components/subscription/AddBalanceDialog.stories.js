import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import AddBalanceDialog from 
    '../../../../logged_in/components/subscription/AddBalanceDialog';

export default {
    component: AddBalanceDialog,
    title: 'LoggedIn/components/subscription/AddBalanceDialog',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/subscription/AddBalanceDialog', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <AddBalanceDialog 
            open={true}
          />
        </div>
    )})