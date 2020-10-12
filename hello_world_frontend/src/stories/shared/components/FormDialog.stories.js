import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import FormDialog from '../../../shared/components/FormDialog';

export default {
    component: FormDialog,
    title: 'Shared/components/FormDialog',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

storiesOf('Shared/components/FormDialog', module)
  .addDecorator(muiTheme(theme))
  .add('Default', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <FormDialog
        open
        {...actions_data}
        loading={false}
        hideBackdrop
        headline="Title"
    />
    </div>
  ))