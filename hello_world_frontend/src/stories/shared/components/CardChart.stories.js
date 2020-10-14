import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import CardChart from 
    '../../../shared/components/CardChart';

export default {
    component: CardChart,
    title: 'Shared/components/CardChart',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/CardChart', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const profit = [];
        const iterations = 300;
        const oneYearSeconds = 60 * 60 * 24 * 365;
        let curProfit = Math.round(3000 + Math.random() * 1000);
        let curUnix = Math.round(new Date().getTime() / 1000) - oneYearSeconds;
        for (let i = 0; i < iterations; i += 1) {
          curUnix += Math.round(oneYearSeconds / iterations);
          curProfit += Math.round((Math.random() * 2 - 1) * 10);
          profit.push({
            value: curProfit,
            timestamp: curUnix,
          });
        }

        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <CardChart 
            data={profit}
            color={theme.palette.secondary.light}
            height="70px"
            title="Profit"
          />
        </div>
    )})