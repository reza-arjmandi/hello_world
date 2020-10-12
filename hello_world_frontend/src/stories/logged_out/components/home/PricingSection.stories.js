import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import PricingSection from 
    '../../../../logged_out/components/home/PricingSection';

export default {
    component: PricingSection,
    title: 'LoggedOut/components/home/PricingSection',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

storiesOf('LoggedOut/components/home/PricingSection', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <PricingSection
          />
        </div>
    )})