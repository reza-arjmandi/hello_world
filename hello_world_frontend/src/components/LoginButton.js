import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import GoogleLogin from 'react-google-login';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
    '& > * + *': {
      margin: theme.spacing(2),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

}));

export default function LoginButton({
  is_log_in, profile, login}) {
  const classes = useStyles();

  if(is_log_in) {
    return (
      <div className={classes.root}>
        <Avatar 
          alt={profile['name']} 
          src={profile['imageUrl']} 
          className={classes.large} />
      </div>
    );
  }

  const responseGoogle = (response) => {
    login(response);
  }

  const responseGoogle2 = (response) => {
    // login(response);
  }

  return (
    <div>
      <GoogleLogin
        clientId="550922846907-2110437f6a9666fb823mj6ki3l7tm1s1.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle2}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

