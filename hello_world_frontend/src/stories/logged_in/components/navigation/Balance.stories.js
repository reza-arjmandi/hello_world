import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import Balance from 
    '../../../../logged_in/components/navigation/Balance';

export default {
    component: Balance,
    title: 'LoggedIn/components/navigation/Balance',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/navigation/Balance', module)
.addDecorator(muiTheme(theme))
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <Balance
        balance={2573}
      />
    </div>
)})