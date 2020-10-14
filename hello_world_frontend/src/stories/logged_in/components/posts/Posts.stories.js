import React from 'react';
import { useCallback } from "react";

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import Posts from 
    '../../../../logged_in/components/posts/Posts';
import persons from "../../../dummy_data/persons";

export default {
    component: Posts,
    title: 'LoggedIn/components/posts/Posts',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/posts/Posts', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const selectPosts = useCallback(() => {})
        const posts = [];
        const iterations = persons.length;
        const oneDaySeconds = 60 * 60 * 24;
        let curUnix = Math.round(
          new Date().getTime() / 1000 - iterations * oneDaySeconds
        );
        for (let i = 0; i < iterations; i += 1) {
          const person = persons[i];
          const post = {
            id: i,
            src: person.src,
            timestamp: curUnix,
            name: person.name,
          };
          curUnix += oneDaySeconds;
          posts.push(post);
        }
        posts.reverse();

        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <Posts
            posts={posts}
            selectPosts={selectPosts}
          />
        </div>
    )})