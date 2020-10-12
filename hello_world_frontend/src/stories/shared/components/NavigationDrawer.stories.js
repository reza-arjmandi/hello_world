import React from 'react';

import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import { CssBaseline } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import NavigationDrawer from '../../../shared/components/NavigationDrawer';

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

export default {
    component: NavigationDrawer,
    title: 'Shared/components/NavigationDrawer',
    excludeStories: /.*_data$/, 
};

export const navigation_drawer_data = {
    menuItems: [
        {
          link: "/",
          name: "Home",
          icon: <HomeIcon className="text-white" />
        },
        {
          link: "/blog",
          name: "Blog",
          icon: <BookIcon className="text-white" />
        },
        {
          name: "Register",
        //   onClick: openRegisterDialog,
          icon: <HowToRegIcon className="text-white" />
        },
        {
          name: "Login",
        //   onClick: openLoginDialog,
          icon: <LockOpenIcon className="text-white" />
        }
      ],
    anchor:"right",
};

storiesOf('Shared/components/NavigationDrawer', module)
  .addDecorator(StoryRouter())
  .addDecorator(muiTheme(theme))
  .add('Default', () => (
    <div>
      <CssBaseline />
      <GlobalStyles />
      <NavigationDrawer 
        open
        {...navigation_drawer_data}
      />
    </div>
    
  ))

