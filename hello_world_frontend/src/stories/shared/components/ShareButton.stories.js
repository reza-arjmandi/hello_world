import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import ShareButton from '../../../shared/components/ShareButton';

export default {
    component: ShareButton,
    title: 'Shared/components/ShareButton',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClick: action('onClick'),
};

export const shared_button_data = {
    title:"React SaaS Template",
    description:"I found an awesome template for an webapp using React!",
    variant:"contained",
    className:"text-white",
    classes:{
        label: "text-white",
    },
};

storiesOf('Shared/components/ShareButton', module)
  .addDecorator(muiTheme(theme))
  .add('Facebook', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <ShareButton
        {...actions_data}
        {...shared_button_data}
        disableElevation
        type="Facebook"
      />
    </div>
  ))
  .add('Twitter', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <ShareButton
        {...actions_data}
        {...shared_button_data}
        disableElevation
        type="Twitter"
      />
    </div>
  ))
  .add('Reddit', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <ShareButton
        {...actions_data}
        {...shared_button_data}
        disableElevation
        type="Reddit"
      />
    </div>
  ))
  .add('Tumblr', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <ShareButton
        {...actions_data}
        {...shared_button_data}
        disableElevation
        type="Tumblr"
       />
    </div>
  ))