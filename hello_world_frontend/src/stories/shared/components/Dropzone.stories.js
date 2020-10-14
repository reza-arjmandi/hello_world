import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import Dropzone from 
    '../../../shared/components/Dropzone';

export default {
    component: Dropzone,
    title: 'Shared/components/Dropzone',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/Dropzone', module)
  .addDecorator(muiTheme(theme))
  .add('Default', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <Dropzone accept="image/png, image/jpeg" fullHeight>
        <span>
          Click / Drop file <br /> here
        </span>
      </Dropzone>
    </div>
  ))