import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import VideoCard from 
    '../../../../logged_out/components/videos/VideoCard';

export default {
    component: VideoCard,
    title: 'LoggedOut/components/videos/VideoCard',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedOut/components/videos/VideoCard', module)
    .addDecorator(StoryRouter())
    .addDecorator(muiTheme(theme))
    .add('Default', () => (
        <div>
          <CssBaseline />
          <GlobalStyles />
          <VideoCard 
            title="video title"
            description="video description"
            stream_url="https://youtu.be/BevAX9Z_qIE"
          />
        </div>
    ))