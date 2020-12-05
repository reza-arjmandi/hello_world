import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import TermsOfServiceDialog from 
    '../../../../logged_out/components/register_login/TermsOfServiceDialog';

export default {
    component: TermsOfServiceDialog,
    title: 'LoggedOut/components/register_login/TermsOfServiceDialog',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedOut/components/register_login/TermsOfServiceDialog', module)
.addDecorator(muiTheme(theme))
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <TermsOfServiceDialog
      />
    </div>
)})