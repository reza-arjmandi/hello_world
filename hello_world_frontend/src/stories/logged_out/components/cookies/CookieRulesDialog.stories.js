import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import CookieRulesDialog from 
    '../../../../logged_out/components/cookies/CookieRulesDialog';

export default {
    component: CookieRulesDialog,
    title: 'LoggedOut/components/cookies/CookieRulesDialog',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

storiesOf('LoggedOut/components/cookies/CookieRulesDialog', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => (
        <div>
          <CssBaseline />
          <GlobalStyles />
          <CookieRulesDialog
          open={true}
          {...actions_data}
          />
        </div>
    ))