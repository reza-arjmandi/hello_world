import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";
import ModalBackdrop from '../../../shared/components/ModalBackdrop';

export default {
    component: ModalBackdrop,
    title: 'Shared/components/ModalBackdrop',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/ModalBackdrop', module)
.addDecorator(muiTheme(theme))
.add('Default', () => (
  <div>
    <CssBaseline />
    <GlobalStyles />
    <ModalBackdrop open/>
  </div>
))