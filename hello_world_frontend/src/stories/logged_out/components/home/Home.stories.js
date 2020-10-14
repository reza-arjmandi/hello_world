import React from 'react';
import { useCallback, useState } from "react";

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import smoothScrollTop from "../../../../shared/functions/smoothScrollTop";

import Home from 
    '../../../../logged_out/components/home/Home';

export default {
    component: Home,
    title: 'LoggedOut/components/home/Home',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

storiesOf('LoggedOut/components/home/Home', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const [selectedTab, setSelectedTab] = useState(null);

        const selectHome = useCallback(() => {
            smoothScrollTop();
            document.title =
              "HelloWorld - Free template for building an SaaS or admin application";
            setSelectedTab("Home");
          }, [setSelectedTab]);
        
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <Home
          selectHome={selectHome}
          />
        </div>
    )})