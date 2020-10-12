import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import VisibilityPasswordTextField from 
    '../../../shared/components/VisibilityPasswordTextField';

export default {
    component: VisibilityPasswordTextField,
    title: 'Shared/components/VisibilityPasswordTextField',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

storiesOf('Shared/components/VisibilityPasswordTextField', module)
  .addDecorator(muiTheme(theme))
  .add('Default', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <VisibilityPasswordTextField 
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label="Password"
      autoComplete="off"
      />
    </div>
  ))