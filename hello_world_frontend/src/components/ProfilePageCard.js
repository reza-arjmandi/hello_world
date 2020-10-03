import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ProfilePageCard({
  profile_info, 
  update_profile_info, 
  is_updating_profile_info,
  is_updating_profile_info_success}) {

  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: is_updating_profile_info_success,
  });

   const [user_type, set_user_type] = React.useState(profile_info["user_type"]);
   const [timezone, set_timezone] = React.useState(profile_info["timezone"]);
   const [skype_link, set_skype_link] = React.useState(profile_info["skype_link"]);
    
   var user_profile_info = {
        url:profile_info["url"],
        user_type: user_type,
        timezone: timezone,
        skype_link: skype_link,
        is_completed: profile_info["is_completed"],
        Avatar: profile_info["Avatar"]
    };

  const handle_user_type = (event) => {
    user_profile_info['user_type'] = event.target.value; 
    set_user_type(event.target.value);
  };

  const handle_timezone = (event) => {
    user_profile_info['timezone'] = event; 
    set_timezone(event);
  };

  const handle_skype_link = (event) => {
    user_profile_info['skype_link'] = event.target.value; 
    set_skype_link(event.target.value);
  };

  const handle_save_button = () => {
    if (!is_updating_profile_info) {
      update_profile_info(
        user_profile_info['url'], 
        user_profile_info['user_type'], 
        user_profile_info['timezone'], 
        user_profile_info['skype_link'],
        user_profile_info['Avatar']);
    }
  };

  return (

        <FormControl component="fieldset">
            <FormLabel component="legend">Are you an English...</FormLabel>
            <RadioGroup aria-label="user_type" name="user_type1" value={user_type} onChange={handle_user_type}>
                {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                <FormControlLabel value="learner" control={<Radio />} label="Learner" />
                <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
            </RadioGroup>
            <TimezonePicker
                    absolute      = {false}
                    placeholder   = "Select timezone..."
                    onChange={handle_timezone}
                    value={timezone}
                    />
            <TextField label="Skype link" onChange={handle_skype_link} value={skype_link}/>
            <div className={classes.root}>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={buttonClassname}
                  disabled={is_updating_profile_info}
                  onClick={handle_save_button}
                >
                  Save Changes
                </Button>
                {is_updating_profile_info && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </div>
        </FormControl>
  );
}
