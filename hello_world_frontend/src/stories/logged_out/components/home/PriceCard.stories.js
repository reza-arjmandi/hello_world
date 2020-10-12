import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';

import { CssBaseline } from "@material-ui/core";
import {
    Typography,
  } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import PriceCard from 
    '../../../../logged_out/components/home/PriceCard';

export default {
    component: PriceCard,
    title: 'LoggedOut/components/home/PriceCard',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

storiesOf('LoggedOut/components/home/PriceCard', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <PriceCard
            title="Starter"
            pricing={
                <span>
                $14.99
                <Typography display="inline"> / month</Typography>
                </span>
            }
            features={["Feature 1", "Feature 2", "Feature 3"]}
          />
        </div>
    )})