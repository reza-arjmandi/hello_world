import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import Bordered from 
    '../../../shared/components/Bordered';

export default {
    component: Bordered,
    title: 'Shared/components/Bordered',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/Bordered', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => (
        <div>
          <CssBaseline />
          <GlobalStyles />
          <Bordered disableVerticalPadding disableBorderRadius />
        </div>
    ))