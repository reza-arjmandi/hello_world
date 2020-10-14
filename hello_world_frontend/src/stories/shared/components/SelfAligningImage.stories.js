import React from 'react';
import { useCallback } from "react";

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';

import { CssBaseline } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import SelfAligningImage from '../../../shared/components/SelfAligningImage';

import persons from "../../dummy_data/persons";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

export default {
    component: SelfAligningImage,
    title: 'Shared/components/SelfAligningImage',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/SelfAligningImage', module)
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
      <SelfAligningImage 
        src={posts[0].src}
        title={posts[0].name}
        timeStamp={posts[0].timestamp}
        options={[
          {
            name: "Delete",
            onClick: () => {
            },
            icon: <DeleteIcon />,
          },
        ]}
      />
    </div>
    
  )})

