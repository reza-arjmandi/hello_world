import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import ActionPaper from 
    '../../../shared/components/ActionPaper';
import AddPostOptions from "../../../logged_in/components/posts/AddPostOptions";
import EmojiTextArea from "../../../shared/components/EmojiTextArea"
import Dropzone from "../../../shared/components/Dropzone"
import DateTimePicker from "../../../shared/components/DateTimePicker"
import ImageCropper from "../../../shared/components/ImageCropper"

export default {
    component: ActionPaper,
    title: 'Shared/components/ActionPaper',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/ActionPaper', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const files = [];
        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <ActionPaper 
            helpPadding
            maxWidth="md"
            content={
                <AddPostOptions
                  EmojiTextArea={EmojiTextArea}
                  Dropzone={Dropzone}
                //   DateTimePicker={DateTimePicker}
                  ImageCropper={ImageCropper}
                  files={files}
                />
              }
          />
        </div>
    )})