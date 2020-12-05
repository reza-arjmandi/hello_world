import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";
import HelpIcon from 
    '../../../shared/components/HelpIcon';

export default {
    component: HelpIcon,
    title: 'Shared/components/HelpIcon',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/HelpIcon', module)
.addDecorator(muiTheme(theme))
.add('Default', () => (
  <div>
    <CssBaseline />
    <GlobalStyles />
    <HelpIcon
      title="this is a title"
    />
  </div>
))