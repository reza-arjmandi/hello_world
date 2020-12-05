import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import AddClassOptions from 
    '../../../../logged_in/components/classes/AddClassOptions';
import EmojiTextArea from 
    '../../../../shared/components/EmojiTextArea';
import ImageCropper from 
    '../../../../shared/components/ImageCropper';
import Dropzone from 
    '../../../../shared/components/Dropzone';
import DateTimePicker from 
    '../../../../shared/components/DateTimePicker';

export default {
    component: AddClassOptions,
    title: 'LoggedIn/components/classes/AddClassOptions',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/classes/AddClassOptions', module)
.addDecorator(muiTheme(theme))
.add('Default', () => {
    const files = [];
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <AddClassOptions
        EmojiTextArea={EmojiTextArea}
        ImageCropper={ImageCropper}
        Dropzone={Dropzone}
        files={files}
        DateTimePicker={DateTimePicker}
      />
    </div>
)})