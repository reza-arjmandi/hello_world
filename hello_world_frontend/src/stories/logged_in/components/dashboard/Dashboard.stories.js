import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";
import { action } from '@storybook/addon-actions';

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import Dashboard from 
    '../../../../logged_in/components/dashboard/Dashboard';
import CardChart from 
    '../../../../shared/components/CardChart';

export default {
    component: Dashboard,
    title: 'LoggedIn/components/dashboard/Dashboard',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
  selectDashboard: action('selectDashboard'),
  pushMessageToSnackbar: action('pushMessageToSnackbar'),
  update_profile_info: action('update_profile_info'),
};

export const dashboard_data = {
  profile_info: {
    'user_type':"teacher",
    'skype_link':"link sample"
  }
};

storiesOf('LoggedIn/components/dashboard/Dashboard', module)
.addDecorator(muiTheme(theme))
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <Dashboard
        CardChart={CardChart} 
        {...actions_data}
        {...dashboard_data}
      />
    </div>
)})