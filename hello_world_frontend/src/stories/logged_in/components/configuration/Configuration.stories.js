import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';
import { CssBaseline } from "@material-ui/core";
import StoryRouter from 'storybook-react-router';

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import Configuration from 
    '../../../../logged_in/components/configuration/Configuration';

export default {
    component: Configuration,
    title: 'LoggedIn/components/configuration/Configuration',
    excludeStories: /.*_data$/, 
};

export const login_profile_page_data = {
    profile_info : {
        "url": "http://127.0.0.1:8000/profile/1/",
        "id": 1,
        "owner": "ali@gmail.com",
        "user_type": "learner",
        "timezone": "invalid",
        "skype_link": "invalid",
        "is_completed": false,
        "Avatar": [
            "http://127.0.0.1:8000/avatar/1/"
        ]
    }
}

export const actions_data = {
    send_profile_info_handle: action('send_profile_info_handle'),
    log_out: action('log_out'),
}

storiesOf('LoggedIn/components/configuration/Configuration', module)
.addDecorator(StoryRouter())
.addDecorator(muiTheme(theme))
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <Configuration
        {...actions_data}
        {...login_profile_page_data}
      />
    </div>
)})