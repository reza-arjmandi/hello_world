import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import BlogCard from 
    '../../../../logged_out/components/blog/BlogCard';

export default {
    component: BlogCard,
    title: 'LoggedOut/components/blog/BlogCard',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedOut/components/blog/BlogCard', module)
    .addDecorator(StoryRouter())
    .addDecorator(muiTheme(theme))
    .add('Default', () => (
        <div>
          <CssBaseline />
          <GlobalStyles />
          <BlogCard 
            title="blog title"
            snippet="blog snippet"
            date="123456"
            url="https://google.com"
          />
        </div>
    ))