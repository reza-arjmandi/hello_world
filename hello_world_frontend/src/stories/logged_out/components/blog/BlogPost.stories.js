import React from 'react';

import { useEffect, useCallback, useState } from "react";
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import BlogPost from 
    '../../../../logged_out/components/blog/BlogPost';

import PropsRoute from "../../../../shared/components/PropsRoute";
import dummyBlogPosts from "../../../dummy_data/blogPosts";

export default {
    component: BlogPost,
    title: 'LoggedOut/components/blog/BlogPost',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedOut/components/blog/BlogPost', module)
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
          {blogPosts.map((post) => (
            <BlogPost
            title={post.title}
            key={post.title}
            image={post.image}
            date={post.date}
            content={post.content}
            otherArticles={blogPosts.filter(
                (blogPost) => blogPost.id !== post.id
            )}
            />
        ))}
        </div>
    )})