import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";
import { action } from '@storybook/addon-actions';

import ImageCropperDialog from 
    '../../../shared/components/ImageCropperDialog';
import ImageCropper from 
    '../../../shared/components/ImageCropper';
import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

export default {
    component: ImageCropperDialog,
    title: 'Shared/components/ImageCropperDialog',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
  setCropFunction: action('setCropFunction'),
};

storiesOf('Shared/components/ImageCropperDialog', module)
.addDecorator(muiTheme(theme))
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <ImageCropperDialog 
        open
        src={`${process.env.PUBLIC_URL}/images/logged_in/image5.jpg`}
        {...actions_data}
        color={theme.palette.primary.main}
        aspectRatio={4 / 3}
        ImageCropper={ImageCropper}
      />
    </div>
)})
    