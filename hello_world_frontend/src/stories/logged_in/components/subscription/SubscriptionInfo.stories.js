import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import SubscriptionInfo from 
    '../../../../logged_in/components/subscription/SubscriptionInfo';

export default {
    component: SubscriptionInfo,
    title: 'LoggedIn/components/subscription/SubscriptionInfo',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/subscription/SubscriptionInfo', module)
.addDecorator(muiTheme(theme))
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <SubscriptionInfo 
        openAddBalanceDialog={true}
      />
    </div>
)})