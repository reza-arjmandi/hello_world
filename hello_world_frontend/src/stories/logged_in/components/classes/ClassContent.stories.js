import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import ClassContent from 
    '../../../../logged_in/components/classes/ClassContent';
import persons from "../../../dummy_data/persons";

export default {
    component: ClassContent,
    title: 'LoggedIn/components/classes/ClassContent',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/classes/ClassContent', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
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
          <ClassContent
            posts={posts}
          />
        </div>
    )})