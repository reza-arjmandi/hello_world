import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import StatisticsArea from 
    '../../../../logged_in/components/dashboard/StatisticsArea';
import CardChart from 
    '../../../../shared/components/CardChart';

export default {
    component: StatisticsArea,
    title: 'LoggedIn/components/dashboard/StatisticsArea',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/dashboard/StatisticsArea', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const statistics = { profit: [], views: [] };
        const iterations = 300;
        const oneYearSeconds = 60 * 60 * 24 * 365;
        let curProfit = Math.round(3000 + Math.random() * 1000);
        let curViews = Math.round(3000 + Math.random() * 1000);
        let curUnix = Math.round(new Date().getTime() / 1000) - oneYearSeconds;
        for (let i = 0; i < iterations; i += 1) {
        curUnix += Math.round(oneYearSeconds / iterations);
        curProfit += Math.round((Math.random() * 2 - 1) * 10);
        curViews += Math.round((Math.random() * 2 - 1) * 10);
        statistics.profit.push({
            value: curProfit,
            timestamp: curUnix,
        });
        statistics.views.push({
            value: curViews,
            timestamp: curUnix,
        });
        }
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <StatisticsArea
          CardChart={CardChart} 
          data={statistics}
          />
        </div>
    )})