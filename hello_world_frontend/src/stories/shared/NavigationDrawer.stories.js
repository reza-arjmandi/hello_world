import React from 'react';

import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import NavigationDrawer from '../../shared/components/NavigationDrawer';

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
        //   icon: <BookIcon className="text-white" />
        },
        {
          name: "Register",
        //   onClick: openRegisterDialog,
        //   icon: <HowToRegIcon className="text-white" />
        },
        {
          name: "Login",
        //   onClick: openLoginDialog,
        //   icon: <LockOpenIcon className="text-white" />
        }
      ],
};

export const Default = () => {
    return <NavigationDrawer 
    open
    {...navigation_drawer_data}
    />;
}


storiesOf('Shared/components/NavigationDrawer', Default)
  .addDecorator(StoryRouter())
  .add('Default', () => (
    <NavigationDrawer/>
  ));