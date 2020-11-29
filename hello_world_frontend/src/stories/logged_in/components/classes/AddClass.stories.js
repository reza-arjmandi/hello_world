import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import AddClass from 
    '../../../../logged_in/components/classes/AddClass';

import EmojiTextArea from 
    '../../../../shared/components/EmojiTextArea';
import ImageCropper from 
    '../../../../shared/components/ImageCropper';
import Dropzone from 
    '../../../../shared/components/Dropzone';
import DateTimePicker from 
    '../../../../shared/components/DateTimePicker';

export default {
    component: AddClass,
    title: 'LoggedIn/components/classes/AddClass',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/classes/AddClass', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <AddClass
            EmojiTextArea={EmojiTextArea}
            ImageCropper={ImageCropper}
            Dropzone={Dropzone}
            DateTimePicker={DateTimePicker}
          />
        </div>
    )})