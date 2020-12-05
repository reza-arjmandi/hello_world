import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";

import HighlighedInformation from 
    '../../../shared/components/HighlightedInformation';
import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

export default {
    component: HighlighedInformation,
    title: 'Shared/components/HighlighedInformation',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/HighlighedInformation', module)
.addDecorator(muiTheme(theme))
.add('Default', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <HighlighedInformation />
    </div>
))
    