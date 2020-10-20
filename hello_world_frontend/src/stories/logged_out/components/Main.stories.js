import React from 'react';
import { Fragment, Suspense, lazy } from "react";

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import Main from 
    '../../../logged_out/components/Main';
import dummyBlogPosts from "../../dummy_data/blogPosts";
import videos_data from "./videos/Videos.stories"

export default {
    component: Main,
    title: 'LoggedOut/components/Main',
    excludeStories: /.*_data$/, 
};

const LoggedOutComponent = lazy(() => import("../../../logged_out/components/Main"));

export const actions_data = {
  change_page: action('change_page'),
};

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
              {...videos_data}
              page_number={0}
              {...actions_data}
              />
            </Suspense>
        </div>
    )})