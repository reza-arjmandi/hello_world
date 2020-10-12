import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import CookieConsent from 
    '../../../../logged_out/components/cookies/CookieConsent';

export default {
    component: CookieConsent,
    title: 'LoggedOut/components/cookies/CookieConsent',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedOut/components/cookies/CookieConsent', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => (
        <div>
          <CssBaseline />
          <GlobalStyles />
          <CookieConsent
          />
        </div>
    ))