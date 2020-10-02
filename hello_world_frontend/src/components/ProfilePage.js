import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';

import AuthRequiredCard from './AuthRequiredCard';
import TextBox from './TextBox';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));


function getSteps() {
    return [
        'Are you...?', 
        'Your timezone',
        'Skype ID'];
  }
  
  function getStepContent(
      step, 
      user_type, 
      handle_change_user_type, 
      handle_change_timezone,
      handle_change_skypeid) {
    switch (step) {
      case 0:
        return (
            <FormControl component="fieldset">
              <FormLabel component="legend">Are you an English ...</FormLabel>
              <RadioGroup aria-label="user_type" name="user_type1" value={user_type} onChange={handle_change_user_type}>
                <FormControlLabel value="learner" control={<Radio />} label="Learner" />
                <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
              </RadioGroup>
            </FormControl>
          );
      case 1:
        return (
            <div className="App">
              <Typography>What is your timezone?</Typography>
              <TimezonePicker
                absolute      = {false}
                placeholder   = "Select timezone..."
                onChange      = {handle_change_timezone}
                />
            </div>
          );
      case 2:
        return (
            <div>
            <Typography>Please enter your skype ID:</Typography>
            <TextBox 
              id='skype_link' 
              label='Skype ID' 
              required={true} 
              read_only={false}
              on_value_change={handle_change_skypeid}
            />
            </div>
        );
      default:
        return 'Unknown step';
    }
  }

export default function ProfilePage({ 
    is_login, 
    profile_request_is_fetching,
    send_profile_info_handle,
    profile_info,
     }) {

    const classes = useStyles();
    const steps = getSteps();
    const [timezone, set_timezone] = React.useState('');
    const [skype_link, set_skype_id] = React.useState('');
    const [user_type, set_user_type] = React.useState('learner');
    const [profile_step, set_profile_step] = React.useState(0);

    if(!is_login) {
      return (
          <div>
            <AuthRequiredCard />
          </div>
      );
    }

    if (profile_info['is_completed']) {
      return (
        <div>

        </div>
      )
    }

    const handle_change_user_type = (event) => {
        set_user_type(event.target.value);
    };

    const handle_change_timezone = (timezoneName) => {
        set_timezone(timezoneName);
    };

    const handle_change_skypeid = (value) => {
        set_skype_id(value['value']);
    }

  const handleNext = () => {
    if(profile_step === 0) {
        set_profile_step(1);
        return;
    }

    if(profile_step === 1 && timezone !== ''){
        set_profile_step(2);
        return;
    }

    if(profile_step === 2 && skype_link !== ''){
        set_profile_step(3);
        return;
    }
  };

  const handle_finish = () => {
      send_profile_info_handle(
        profile_info['url'], 
        user_type, 
        timezone, 
        skype_link, 
        profile_info['Avatar']);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={profile_step}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {profile_step === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>

            {profile_request_is_fetching && <CircularProgress />}
            {!profile_request_is_fetching &&  
            <Button 
              onClick={handle_finish} 
              className={classes.button} 
              color="primary" 
              variant="contained">
              Finish
            </Button>
            }
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{
                getStepContent(
                    profile_step, 
                    user_type, 
                    handle_change_user_type,
                    handle_change_timezone,
                    handle_change_skypeid)}</Typography>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
