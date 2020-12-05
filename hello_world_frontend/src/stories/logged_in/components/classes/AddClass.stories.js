import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
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

export const actions_data = {
    pushMessageToSnackbar: action('pushMessageToSnackbar'),
    create_english_class: action('create_english_class'),
    onClose: action('onClose'),
};

storiesOf('LoggedIn/components/classes/AddClass', module)
    .addDecorator(muiTheme(theme))
    .addDecorator(StoryRouter())
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <AddClass
            EmojiTextArea={EmojiTextArea}
            ImageCropper={ImageCropper}
            Dropzone={Dropzone}
            DateTimePicker={DateTimePicker}
            {...actions_data}
          />
        </div>
    )})