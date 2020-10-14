import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import NavBar from 
    '../../../../logged_in/components/navigation/NavBar';
import persons from "../../../dummy_data/persons";

export default {
    component: NavBar,
    title: 'LoggedIn/components/navigation/NavBar',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/navigation/NavBar', module)
    .addDecorator(StoryRouter())
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const messages = [];
        const iterations = persons.length;
        const oneDaySeconds = 60 * 60 * 24;
        let curUnix = Math.round(
          new Date().getTime() / 1000 - iterations * oneDaySeconds
        );
        for (let i = 0; i < iterations; i += 1) {
          const person = persons[i];
          const message = {
            id: i,
            src: person.src,
            date: curUnix,
            text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed.",
          };
          curUnix += oneDaySeconds;
          messages.push(message);
        }
        messages.reverse();

        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <NavBar
            messages={messages}
            selectedTab="Dashboard"
          />
        </div>
    )})