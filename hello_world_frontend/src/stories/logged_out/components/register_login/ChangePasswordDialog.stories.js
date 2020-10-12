import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import ChangePasswordDialog from 
    '../../../../logged_out/components/register_login/ChangePasswordDialog';

export default {
    component: ChangePasswordDialog,
    title: 'LoggedOut/components/register_login/ChangePasswordDialog',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

storiesOf('LoggedOut/components/register_login/ChangePasswordDialog', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <ChangePasswordDialog
            {...actions_data}
          />
        </div>
    )})