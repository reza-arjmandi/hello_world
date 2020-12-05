import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import FeatureCard from 
    '../../../../logged_out/components/home/FeatureCard';

export default {
    component: FeatureCard,
    title: 'LoggedOut/components/home/FeatureCard',
    excludeStories: /.*_data$/, 
};

const iconSize = 30;

storiesOf('LoggedOut/components/home/FeatureCard', module)
.addDecorator(muiTheme(theme))
.add('Default', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <FeatureCard
        Icon={<BuildIcon style={{ fontSize: iconSize }} />}
        color="#00C853"
        headline="Feature 1"
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et."
      />
    </div>
))