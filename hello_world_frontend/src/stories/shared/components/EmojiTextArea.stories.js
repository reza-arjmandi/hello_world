import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";
import EmojiTextArea from 
    '../../../shared/components/EmojiTextArea';

export default {
    component: EmojiTextArea,
    title: 'Shared/components/EmojiTextArea',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/EmojiTextArea', module)
.addDecorator(muiTheme(theme))
.add('Default', () => (
  <div>
    <CssBaseline />
    <GlobalStyles />
    <EmojiTextArea
      maxCharacters={2200}
      emojiSet="google"
    />
  </div>
))