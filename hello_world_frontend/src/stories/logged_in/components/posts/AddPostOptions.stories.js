import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import AddPostOptions from 
    '../../../../logged_in/components/posts/AddPostOptions';

import EmojiTextArea from 
    '../../../../shared/components/EmojiTextArea';
import ImageCropper from 
    '../../../../shared/components/ImageCropper';
import Dropzone from 
    '../../../../shared/components/Dropzone';
import DateTimePicker from 
    '../../../../shared/components/DateTimePicker';

export default {
    component: AddPostOptions,
    title: 'LoggedIn/components/posts/AddPostOptions',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/posts/AddPostOptions', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const files = [];
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <AddPostOptions
            EmojiTextArea={EmojiTextArea}
            ImageCropper={ImageCropper}
            Dropzone={Dropzone}
            files={files}
            // DateTimePicker={DateTimePicker}
          />
        </div>
    )})