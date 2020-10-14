import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../../theme";
import GlobalStyles from "../../../../../GlobalStyles";

import StripeCardForm from 
    '../../../../../logged_in/components/subscription/stripe/StripeCardForm';

export default {
    component: StripeCardForm,
    title: 'LoggedIn/components/subscription/stripe/StripeCardForm',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/subscription/stripe/StripeCardForm', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <StripeCardForm 
            name="reza"
            amount={12000}
          />
        </div>
    )})