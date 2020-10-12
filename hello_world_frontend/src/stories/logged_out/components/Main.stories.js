import React from 'react';
import { Fragment, Suspense, lazy } from "react";

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import Main from 
    '../../../logged_out/components/Main';
import dummyBlogPosts from "../../dummy_data/blogPosts";

export default {
    component: Main,
    title: 'LoggedOut/components/Main',
    excludeStories: /.*_data$/, 
};

const LoggedOutComponent = lazy(() => import("../../../logged_out/components/Main"));

storiesOf('LoggedOut/components/Main', module)
    .addDecorator(StoryRouter())
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        return (<div>
          <CssBaseline />
          <GlobalStyles />
            <Suspense fallback={<Fragment />}>
              <LoggedOutComponent
              blog_posts_data={dummyBlogPosts}
              />
            </Suspense>
        </div>
    )})