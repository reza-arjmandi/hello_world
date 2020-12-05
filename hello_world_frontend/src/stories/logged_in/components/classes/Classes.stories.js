import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";
import StoryRouter from 'storybook-react-router';

import EmojiTextArea from 
    '../../../../shared/components/EmojiTextArea';
import ImageCropper from 
    '../../../../shared/components/ImageCropper';
import Dropzone from 
    '../../../../shared/components/Dropzone';
import DateTimePicker from 
    '../../../../shared/components/DateTimePicker';
import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import Classes from 
    '../../../../logged_in/components/classes/Classes';
import { class_content_data } from './ClassContent.stories';

export default {
    component: Classes,
    title: 'LoggedIn/components/classes/Classes',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
  fetch_english_classes: action('fetch_english_classes'),
  selectClasses: action('selectClasses'),
  pushMessageToSnackbar: action('pushMessageToSnackbar'),
  create_english_class: action('create_english_class'),
  closeAddPostModal: action('closeAddPostModal'),
  openAddPostModal: action('openAddPostModal'),
};

export const add_class_mode_data = {
  isAddPostPaperOpen: true
};

storiesOf('LoggedIn/components/classes/Classes', module)
.addDecorator(muiTheme(theme))
.addDecorator(StoryRouter())
.add('Default', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <Classes
        EmojiTextArea={EmojiTextArea}
        ImageCropper={ImageCropper}
        Dropzone={Dropzone}
        DateTimePicker={DateTimePicker}
        {...class_content_data}
        {...actions_data}
      />
    </div>
)})
.add('Add Class Mode', () => {
  return (<div>
    <CssBaseline />
    <GlobalStyles />
    <Classes
      EmojiTextArea={EmojiTextArea}
      ImageCropper={ImageCropper}
      Dropzone={Dropzone}
      DateTimePicker={DateTimePicker}
      {...class_content_data}
      {...actions_data}
      {...add_class_mode_data}
    />
  </div>
)})