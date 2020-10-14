import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CardElement } from "@stripe/react-stripe-js";

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../../theme";
import GlobalStyles from "../../../../../GlobalStyles";

import StripeTextField from 
    '../../../../../logged_in/components/subscription/stripe/StripeTextField';

export default {
    component: StripeTextField,
    title: 'LoggedIn/components/subscription/stripe/StripeTextField',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/subscription/stripe/StripeTextField', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <StripeTextField
            margin="none"
            fullWidth
            label="Credit Card"
            error={false}
            helperText={"heloper text"}
            variant="outlined"
            required
            StripeElement={CardElement}
          />
        </div>
    )})