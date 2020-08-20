import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginButton from './LoginButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  }
}));

const menu_button = (classes, open_menu, menu_is_open) => {
  return (
    <IconButton 
      edge="start" 
      className={classes.menuButton} 
      color="inherit" 
      aria-label="menu"
      onClick={open_menu}
      className={clsx(classes.menuButton, menu_is_open && classes.hide)}
      >
        <MenuIcon />
    </IconButton>
  );
};

const app_title = (classes, title) => {
  return (
    <Typography variant="h6" className={classes.title}>
      {title} 
    </Typography>
  );
};

const toolbar = (
  classes, 
  title, 
  is_log_in, 
  profile,
  login, 
  open_menu,
  menu_is_open) => {
  return (
    <Toolbar>
      {menu_button(classes, open_menu, menu_is_open)}
      {app_title(classes, title)}
      {/* <LoginButton 
        is_log_in={is_log_in} 
        profile={profile}
        login={login}
      /> */}
    </Toolbar>
  );
}

export default function ButtonAppBar({ 
  title, 
  is_log_in, 
  profile, 
  login, 
  open_menu,
  menu_is_open }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        {toolbar(classes, title, is_log_in, profile,
           login, open_menu, menu_is_open)}
      </AppBar>
    </div>
  );
}

