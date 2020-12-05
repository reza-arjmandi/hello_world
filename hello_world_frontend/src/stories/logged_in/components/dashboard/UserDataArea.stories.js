import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";
import UserDataArea from 
    '../../../../logged_in/components/dashboard/UserDataArea';
import persons from "../../../dummy_data/persons";

export default {
    component: UserDataArea,
    title: 'LoggedIn/components/dashboard/UserDataArea',
    excludeStories: /.*_data$/, 
};

storiesOf('LoggedIn/components/dashboard/UserDataArea', module)
.addDecorator(muiTheme(theme))
.add('Default', () => {
    const targets = [];
    for (let i = 0; i < 35; i += 1) {
      const randomPerson = persons[Math.floor(Math.random() * persons.length)];
      const target = {
        id: i,
        number1: Math.floor(Math.random() * 251),
        number2: Math.floor(Math.random() * 251),
        number3: Math.floor(Math.random() * 251),
        number4: Math.floor(Math.random() * 251),
        name: randomPerson.name,
        profilePicUrl: randomPerson.src,
        isActivated: Math.round(Math.random()) ? true : false,
      };
      targets.push(target);
    }
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <UserDataArea
        targets={targets}
      />
    </div>
)})