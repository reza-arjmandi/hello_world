import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import DialogTitleWithCloseIcon from 
    '../../../shared/components/DialogTitleWithCloseIcon';

export default {
    component: DialogTitleWithCloseIcon,
    title: 'Shared/components/DialogTitleWithCloseIcon',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

storiesOf('Shared/components/DialogTitleWithCloseIcon', module)
  .addDecorator(muiTheme(theme))
  .add('Default', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <DialogTitleWithCloseIcon
        title="Dialog Title With Close Icon"
        {...actions_data}
        disabled={true}
      />
    </div>
  ))