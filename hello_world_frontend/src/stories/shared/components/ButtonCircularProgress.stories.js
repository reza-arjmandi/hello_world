import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import ButtonCircularProgress from 
    '../../../shared/components/ButtonCircularProgress';

export default {
    component: ButtonCircularProgress,
    title: 'Shared/components/ButtonCircularProgress',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/ButtonCircularProgress', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => (
        <div>
          <CssBaseline />
          <GlobalStyles />
          <ButtonCircularProgress />
        </div>
    ))