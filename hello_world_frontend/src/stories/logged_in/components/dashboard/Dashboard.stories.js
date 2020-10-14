import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import Dashboard from 
    '../../../../logged_in/components/dashboard/Dashboard';
import CardChart from 
    '../../../../shared/components/CardChart';

import persons from "../../../dummy_data/persons";

export default {
    component: Dashboard,
    title: 'LoggedIn/components/dashboard/Dashboard',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/dashboard/Dashboard', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const targets = [];
        for (let i = 0; i < 35; i += 1) {
          const randomPerson = persons[Math.floor(Math.random() * persons.length)];
          const target = {
            id: i,
            number1: Math.floor(Math.random() * 251),
            number2: Math.floor(Math.random() * 251),
            number3: Math.floor(Math.random() * 251),
            number4: Math.floor(Math.random() * 251),
            name: randomPerson.name,
            profilePicUrl: randomPerson.src,
            isActivated: Math.round(Math.random()) ? true : false,
          };
          targets.push(target);
        }

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
          <Dashboard
            targets={targets}
            statistics={statistics}
            CardChart={CardChart} 
          />
        </div>
    )})