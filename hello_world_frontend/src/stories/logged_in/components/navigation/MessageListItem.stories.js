import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import MessageListItem from 
    '../../../../logged_in/components/navigation/MessageListItem';

export default {
    component: MessageListItem,
    title: 'LoggedIn/components/navigation/MessageListItem',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/navigation/MessageListItem', module)
.addDecorator(muiTheme(theme))
.add('Default', () => {
    const iterations = 100;
    const oneDaySeconds = 60 * 60 * 24;
    let curUnix = Math.round(
      new Date().getTime() / 1000 - iterations * oneDaySeconds
    );
    const message = {
        id: 1,
        src: `${process.env.PUBLIC_URL}/images/logged_in/image1.jpg`,
        date: curUnix,
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed.",
      };
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <MessageListItem
            message={message}
      />
    </div>
)})