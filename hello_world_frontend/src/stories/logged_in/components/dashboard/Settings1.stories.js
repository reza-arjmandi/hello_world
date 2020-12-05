import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";
import { action } from '@storybook/addon-actions';

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import Settings1 from 
    '../../../../logged_in/components/dashboard/Settings1';

export default {
    component: Settings1,
    title: 'LoggedIn/components/dashboard/Settings1',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
  pushMessageToSnackbar: action('pushMessageToSnackbar'),
  update_profile_info: action('update_profile_info'),
};

export const settings_data = {
  profile_info: {
    'user_type':"teacher",
    'skype_link':"link sample"
  }
};

storiesOf('LoggedIn/components/dashboard/Settings1', module)
.addDecorator(muiTheme(theme))
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <Settings1
        {...settings_data}
        {...actions_data}
      />
    </div>
)})