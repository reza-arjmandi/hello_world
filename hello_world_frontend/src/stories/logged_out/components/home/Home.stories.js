import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import Home from 
    '../../../../logged_out/components/home/Home';

export default {
    component: Home,
    title: 'LoggedOut/components/home/Home',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    selectHome: action('selectHome'),
};

storiesOf('LoggedOut/components/home/Home', module)
.addDecorator(muiTheme(theme))
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <Home
      {...actions_data}
      />
    </div>
)})