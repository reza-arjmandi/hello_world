import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import Blog from 
    '../../../../logged_out/components/blog/Blog';

import dummyBlogPosts from "../../../dummy_data/blogPosts";

export default {
    component: Blog,
    title: 'LoggedOut/components/blog/Blog',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
  selectHome: action('selectHome'),
  selectBlog: action('selectBlog'),
};

storiesOf('LoggedOut/components/blog/Blog', module)
.addDecorator(StoryRouter())
.addDecorator(muiTheme(theme))
.add('Default', () => {
    const blogPosts = dummyBlogPosts.map((blogPost) => {
        let title = blogPost.title;
        title = title.toLowerCase();
        /* Remove unwanted characters, only accept alphanumeric and space */
        title = title.replace(/[^A-Za-z0-9 ]/g, "");
        /* Replace multi spaces with a single space */
        title = title.replace(/\s{2,}/g, " ");
        /* Replace space with a '-' symbol */
        title = title.replace(/\s/g, "-");
        blogPost.url = `/blog/post/${title}`;
        blogPost.params = `?id=${blogPost.id}`;
        return blogPost;
      });

    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <Blog 
        blogPosts={blogPosts}
        {...actions_data}
      />
    </div>
)})