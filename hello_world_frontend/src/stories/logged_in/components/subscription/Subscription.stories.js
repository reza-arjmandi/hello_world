import React from 'react';
import { useCallback } from "react";

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import Subscription from 
    '../../../../logged_in/components/subscription/Subscription';

export default {
    component: Subscription,
    title: 'LoggedIn/components/subscription/Subscription',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/subscription/Subscription', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const selectSubscription = useCallback(() => {
          }, []);

        const transactions = [];
        const iterations = 32;
        const oneMonthSeconds = Math.round(60 * 60 * 24 * 30.5);
        const transactionTemplates = [
          {
            description: "Starter subscription",
            isSubscription: true,
            balanceChange: -1499,
          },
          {
            description: "Premium subscription",
            isSubscription: true,
            balanceChange: -2999,
          },
          {
            description: "Business subscription",
            isSubscription: true,
            balanceChange: -4999,
          },
          {
            description: "Tycoon subscription",
            isSubscription: true,
            balanceChange: -9999,
          },
          {
            description: "Added funds",
            isSubscription: false,
            balanceChange: 2000,
          },
          {
            description: "Added funds",
            isSubscription: false,
            balanceChange: 5000,
          },
        ];
        let curUnix = Math.round(
          new Date().getTime() / 1000 - iterations * oneMonthSeconds
        );
        for (let i = 0; i < iterations; i += 1) {
          const randomTransactionTemplate =
            transactionTemplates[
              Math.floor(Math.random() * transactionTemplates.length)
            ];
          const transaction = {
            id: i,
            description: randomTransactionTemplate.description,
            balanceChange: randomTransactionTemplate.balanceChange,
            paidUntil: curUnix + oneMonthSeconds,
            timestamp: curUnix,
          };
          curUnix += oneMonthSeconds;
          transactions.push(transaction);
        }
        transactions.reverse();

        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <Subscription 
            transactions={transactions}
            path="/c/subscription"
            openAddBalanceDialog={true}
            selectSubscription={selectSubscription}
          />
        </div>
    )})