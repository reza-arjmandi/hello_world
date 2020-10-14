import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import MessagePopperButton from 
    '../../../../logged_in/components/navigation/MessagePopperButton';
import persons from "../../../dummy_data/persons";

export default {
    component: MessagePopperButton,
    title: 'LoggedIn/components/navigation/MessagePopperButton',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/navigation/MessagePopperButton', module)
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
          <MessagePopperButton
            messages={messages}
          />
        </div>
    )})