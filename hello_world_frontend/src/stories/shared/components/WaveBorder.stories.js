import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import WaveBorder from '../../../shared/components/WaveBorder';

export default {
    component: WaveBorder,
    title: 'Shared/components/WaveBorder',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/WaveBorder', module)
  .addDecorator(muiTheme(theme))
  .add('Default', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <WaveBorder 
        upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        animationNegativeDelay={2}
      />
    </div>
  ))