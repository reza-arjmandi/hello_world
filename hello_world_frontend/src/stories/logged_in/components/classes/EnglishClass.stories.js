import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import EnglishClass from 
    '../../../../logged_in/components/classes/EnglishClass';

import EmojiTextArea from 
    '../../../../shared/components/EmojiTextArea';
import ImageCropper from 
    '../../../../shared/components/ImageCropper';
import Dropzone from 
    '../../../../shared/components/Dropzone';
import DateTimePicker from 
    '../../../../shared/components/DateTimePicker';

export default {
    component: EnglishClass,
    title: 'LoggedIn/components/classes/EnglishClass',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    selectClasses: action('selectClasses'),
    openAddPostModal: action('openAddPostModal'),
};

export const update_english_class_data = {
    selected_english_class: {
        "url": "http://127.0.0.1:8000/english_class/1/",
        "id": 1,
        "owner": "DsEtGn@WOfl.oeX",
        "title": "7J",
        "description": "UeEhmVKhkgImRZ0G974TdjWm1xHlfUDbx7mEGvMiO1uUM2yeXwevzu0P0CvfePKDSApptYjZap8qBEyiNHCrBywYc",
        "created": "2020-11-16",
        "date_time": "2020-12-20T12:00:00Z",
        "skype_link": "LiFGUw352DqDFAGkdMe",
        "image": "http://127.0.0.1:8000/photos/Q2.jpg",
        "capacity": 2
    }
};

storiesOf('LoggedIn/components/classes/EnglishClass', module)
    .addDecorator(StoryRouter())
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const files = [];
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <EnglishClass
            EmojiTextArea={EmojiTextArea}
            ImageCropper={ImageCropper}
            Dropzone={Dropzone}
            files={files}
            DateTimePicker={DateTimePicker}
            {...update_english_class_data}
            {...actions_data}
          />
        </div>
    )})