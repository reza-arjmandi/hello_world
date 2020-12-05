import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import LoginDialog from 
    '../../../../logged_out/components/register_login/LoginDialog';

export default {
    component: LoginDialog,
    title: 'LoggedOut/components/register_login/LoginDialog',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedOut/components/register_login/LoginDialog', module)
.addDecorator(StoryRouter())
.addDecorator(muiTheme(theme))
.add('Step1', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <LoginDialog
        login_step={0}
      />
    </div>
)})
.add('Step2', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <LoginDialog
        login_step={1}
      />
    </div>
)})
.add('Step3', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <LoginDialog
        login_step={2}
      />
    </div>
)})
