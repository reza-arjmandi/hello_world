import React from 'react';
import { useEffect, useCallback, useState } from "react";

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import Blog from 
    '../../../../logged_out/components/blog/Blog';

import dummyBlogPosts from "../../../dummy_data/blogPosts";
import smoothScrollTop from "../../../../shared/functions/smoothScrollTop";

export default {
    component: Blog,
    title: 'LoggedOut/components/blog/Blog',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedOut/components/blog/Blog', module)
    .addDecorator(StoryRouter())
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const [blogPosts, setBlogPosts] = useState([]);
        const fetchBlogPosts = useCallback(() => {
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
            setBlogPosts(blogPosts);
          }, [setBlogPosts]);
        
        useEffect(fetchBlogPosts, []);

        const [selectedTab, setSelectedTab] = useState(null);

        const selectHome = useCallback(() => {
            smoothScrollTop();
            document.title =
              "WaVer - Free template for building an SaaS or admin application";
            setSelectedTab("Home");
          }, [setSelectedTab]);
        
        const selectBlog = useCallback(() => {
          smoothScrollTop();
          document.title = "WaVer - Blog";
          setSelectedTab("Blog");
        }, [setSelectedTab]);

        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <Blog 
            blogPosts={blogPosts}
            selectHome={selectHome}
            selectBlog={selectBlog}
          />
        </div>
    )})