import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import Footer from 
    '../../../../logged_out/components/footer/Footer';

export default {
    component: Footer,
    title: 'LoggedOut/components/footer/Footer',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedOut/components/footer/Footer', module)
.addDecorator(muiTheme(theme))
.add('Default', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <Footer />
    </div>
))