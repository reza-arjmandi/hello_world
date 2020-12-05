import React from "react";

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";
import { action } from '@storybook/addon-actions';

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";
import ConsecutiveSnackbarMessages from 
    '../../../shared/components/ConsecutiveSnackbarMessages';

export default {
    component: ConsecutiveSnackbarMessages,
    title: 'Shared/components/ConsecutiveSnackbarMessages',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
  getPushMessageFromChild: action('getPushMessageFromChild'),
};

storiesOf('Shared/components/ConsecutiveSnackbarMessages', module)
.addDecorator(muiTheme(theme))
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <ConsecutiveSnackbarMessages 
        {...actions_data}
      />
    </div>
)})