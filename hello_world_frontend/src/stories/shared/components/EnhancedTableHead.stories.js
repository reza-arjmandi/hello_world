import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import EnhancedTableHead from 
    '../../../shared/components/EnhancedTableHead';

export default {
    component: EnhancedTableHead,
    title: 'Shared/components/EnhancedTableHead',
    excludeStories: /.*_data$/, 
};

export const table_data = {
    rows : [
        {
          id: "icon",
          numeric: true,
          label: "",
        },
        {
          id: "name",
          numeric: false,
          label: "Name",
        },
        { id: "number1", numeric: false, label: "Category 1" },
        { id: "number2", numeric: false, label: "Category 2" },
        { id: "number3", numeric: false, label: "Category 3" },
        {
          id: "number4",
          numeric: false,
          label: "Category 4",
        },
        {
          id: "actions",
          numeric: false,
          label: "",
        },
    ],
    rowCount:3,
};

storiesOf('Shared/components/EnhancedTableHead', module)
  .addDecorator(muiTheme(theme))
  .add('Default', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <EnhancedTableHead
        // order={order}
        // orderBy={orderBy}
        // onRequestSort={handleRequestSort}
        // rowCount={targets.length}
        // rows={rows}
        {...table_data}
      />
    </div>
  ))