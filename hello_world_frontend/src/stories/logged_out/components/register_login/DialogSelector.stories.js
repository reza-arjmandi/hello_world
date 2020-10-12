import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import DialogSelector from 
    '../../../../logged_out/components/register_login/DialogSelector';

export default {
    component: DialogSelector,
    title: 'LoggedOut/components/register_login/DialogSelector',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedOut/components/register_login/DialogSelector', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <DialogSelector
          open
          dialogOpen={true}
          />
        </div>
    )})