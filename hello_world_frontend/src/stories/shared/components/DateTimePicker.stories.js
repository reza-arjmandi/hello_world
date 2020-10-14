import React from "react";

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import DateTimePicker from 
    '../../../shared/components/DateTimePicker';

export default {
    component: DateTimePicker,
    title: 'Shared/components/DateTimePicker',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onChangeUploadAt: action('onChangeUploadAt'),
};

storiesOf('Shared/components/DateTimePicker', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const date = new Date();
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <DateTimePicker 
            value={date}
            format="yyyy/MM/dd hh:mm a"
            {...actions_data}
            disablePast
          />
        </div>
    )})