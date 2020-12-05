import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";
import ConfirmationDialog from 
    '../../../shared/components/ConfirmationDialog';

export default {
    component: ConfirmationDialog,
    title: 'Shared/components/ConfirmationDialog',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
    onConfirm: action('onConfirm'),
};

export const dialog_data = {
    open: true,
    title:"Confirmation",
};

storiesOf('Shared/components/ConfirmationDialog', module)
.addDecorator(muiTheme(theme))
.add('Default', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <ConfirmationDialog 
        content={
            <span>
              {"Do you really want to remove the friend "}
              <b>{'ThisItem'}</b>
              {" from your list?"}
            </span>
        }
        {...actions_data}
        {...dialog_data}
        loading={false}
      />
    </div>
))
.add('Loading', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <ConfirmationDialog 
        content={
            <span>
              {"Do you really want to remove the friend "}
              <b>{'ThisItem'}</b>
              {" from your list?"}
            </span>
        }
        {...actions_data}
        {...dialog_data}
        loading={true}
      />
    </div>
))