import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';
import { CssBaseline } from "@material-ui/core";
import { action } from '@storybook/addon-actions';

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import NavBar from 
    '../../../../logged_in/components/navigation/NavBar';

export default {
    component: NavBar,
    title: 'LoggedIn/components/navigation/NavBar',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
  fetch_profile_avatar: action('fetch_profile_avatar'),
};

export const navbar_data = {
  profile_info: {
    'user_type':"teacher",
    'skype_link':"link sample",
    'owner':"owner sample",
    'avatar':"http://127.0.0.1:8000/photos/user.png/"
  }
};

storiesOf('LoggedIn/components/navigation/NavBar', module)
.addDecorator(StoryRouter())
.addDecorator(muiTheme(theme))
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <NavBar
        {...navbar_data}
        {...actions_data}
        selectedTab="Dashboard"
      />
    </div>
)})