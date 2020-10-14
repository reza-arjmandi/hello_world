import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../../theme";
import GlobalStyles from "../../../../../GlobalStyles";

import StripeIBANForm from 
    '../../../../../logged_in/components/subscription/stripe/StripeIBANForm';

export default {
    component: StripeIBANForm,
    title: 'LoggedIn/components/subscription/stripe/StripeIBANForm',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/subscription/stripe/StripeIBANForm', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <StripeIBANForm
            name="Reza"
            email="email"
            amount={12000}
          />
        </div>
    )})