import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';

import { CssBaseline } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import VertOptions from '../../../shared/components/VertOptions';

export default {
    component: VertOptions,
    title: 'Shared/components/VertOptions',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/VertOptions', module)
  .addDecorator(muiTheme(theme))
  .add('Default', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <VertOptions
        color={theme.palette.common.black} 
        items={[
            {
              name: "Delete",
              onClick: () => {
              },
              icon: <DeleteIcon />,
            },
          ]}
      />
    </div>
  ))