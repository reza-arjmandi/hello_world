import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";
import { action } from '@storybook/addon-actions';

import ImageCropper from 
    '../../../shared/components/ImageCropper';
import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

export default {
    component: ImageCropper,
    title: 'Shared/components/ImageCropper',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
  setCropFunction: action('getCropFunctionFromChild'),
};

storiesOf('Shared/components/ImageCropper', module)
.addDecorator(muiTheme(theme))
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <ImageCropper 
        src={`${process.env.PUBLIC_URL}/images/logged_in/image5.jpg`}
        color={theme.palette.primary.main}
        aspectRatio={4 / 3}
        {...actions_data}
      />
    </div>
)})
    