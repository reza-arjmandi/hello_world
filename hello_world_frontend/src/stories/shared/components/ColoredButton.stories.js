import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import ColoredButton from '../../../shared/components/ColoredButton';

export default {
    component: ColoredButton,
    title: 'Shared/components/ColoredButton',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClick: action('onClick'),
};

storiesOf('Shared/components/ColoredButton', module)
    .addDecorator(muiTheme(theme))
    .add('Contained', () => (
        <div>
          <CssBaseline />
          <GlobalStyles />
          <ColoredButton
            {...actions_data}
            variant="contained"
            color={theme.palette.common.black}
          >
              Back
          </ColoredButton>
        </div>
    ))
    .add('Outlined', () => (
        <div>
          <CssBaseline />
          <GlobalStyles />
          <ColoredButton
            {...actions_data}
            color={theme.palette.common.black}
            variant="outlined"
            type="submit"
          >
              Send Message
          </ColoredButton>
        </div>
    ))