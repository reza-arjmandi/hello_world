import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import SettingsArea from 
    '../../../../logged_in/components/dashboard/SettingsArea';

export default {
    component: SettingsArea,
    title: 'LoggedIn/components/dashboard/SettingsArea',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/dashboard/SettingsArea', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <SettingsArea
          />
        </div>
    )})