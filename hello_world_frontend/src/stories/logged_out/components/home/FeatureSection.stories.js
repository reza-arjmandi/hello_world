import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import FeatureSection from 
    '../../../../logged_out/components/home/FeatureSection';

export default {
    component: FeatureSection,
    title: 'LoggedOut/components/home/FeatureSection',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

storiesOf('LoggedOut/components/home/FeatureSection', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => (
        <div>
          <CssBaseline />
          <GlobalStyles />
          <FeatureSection
          />
        </div>
    ))