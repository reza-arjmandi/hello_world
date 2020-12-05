import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";
import ZoomImage from '../../../shared/components/ZoomImage';

export default {
    component: ZoomImage,
    title: 'Shared/components/ZoomImage',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/ZoomImage', module)
.addDecorator(muiTheme(theme))
.add('Default', () => (
  <div>
    <CssBaseline />
    <GlobalStyles />
    <ZoomImage 
    src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Ftags%2Flandscape&psig=AOvVaw1tmCTBReR62qq_04OD5Y0J&ust=1602581519451000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNicns3fruwCFQAAAAAdAAAAABAj"
    alt=""
    />
  </div>
))