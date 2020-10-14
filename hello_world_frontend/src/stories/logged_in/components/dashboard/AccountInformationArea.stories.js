import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import AccountInformationArea from 
    '../../../../logged_in/components/dashboard/AccountInformationArea';

export default {
    component: AccountInformationArea,
    title: 'LoggedIn/components/dashboard/AccountInformationArea',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/dashboard/AccountInformationArea', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <AccountInformationArea
            isAccountActivated={true}
          />
        </div>
    )})