import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import SubscribeEnglishClass from 
    '../../../../logged_in/components/classes/SubscribeEnglishClass';

export default {
    component: SubscribeEnglishClass,
    title: 'LoggedIn/components/classes/SubscribeEnglishClass',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    pushMessageToSnackbar: action('pushMessageToSnackbar'),
    subscribe_english_class: action('subscribe_english_class'),
    onClose: action('onClose'),
};

export const subscribe_mode_data = {
    selected_english_class: {
        "url": "http://127.0.0.1:8000/english_class/1/",
        "id": 1,
        "owner": "DsEtGn@WOfl.oeX",
        "title": "7J",
        "description": "UeEhmVKhkgImRZ0G974TdjWm1xHlfUDbx7mEGvMiO1uUM2yeXwevzu0P0CvfePKDSApptYjZap8qBEyiNHCrBywYc",
        "created": "2020-11-16",
        "date_time": "2020-12-20T12:00:00Z",
        "skype_link": "LiFGUw352DqDFAGkdMe",
        "image": "http://127.0.0.1:8000/photos/Q2.jpg",
        "capacity": 2
    }
};

storiesOf('LoggedIn/components/classes/SubscribeEnglishClass', module)
.addDecorator(StoryRouter())
.addDecorator(muiTheme(theme))
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <SubscribeEnglishClass
        {...subscribe_mode_data}
        {...actions_data}
      />
    </div>
)})
