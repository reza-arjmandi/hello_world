import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import TextBox from './TextBox';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      width:"100%"
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
}));

const dialog_title = () => {
  return (
    <DialogTitle id="form-dialog-title">Login</DialogTitle>
  );
};

const dialog_actions = (
  login_step, 
  login_handle, 
  verify_handle, 
  login_request_is_fetching,
  open_profile_menu) => {

  if(login_request_is_fetching) {
    return (
      <DialogActions>
        <div>
          <CircularProgress />
        </div>
      </DialogActions>
    );
  }

  const steps = getSteps();
  var handle = null
  if(login_step === 0) {
    handle = login_handle;
  }

  if(login_step === 1) {
    handle = verify_handle;
  }

  if(login_step === 2) {
    handle = open_profile_menu;
  }

  return (
    <DialogActions>
      <div>
        <Button variant="contained" color="primary" onClick={handle}>
          {login_step === 0 && 'Next'}
          {login_step === 1 && 'Next'}
          {login_step === 2 && 'Finish'}
        </Button>
      </div>
    </DialogActions>
  );
};

function getSteps() {
  return ['Submit Email', 'Verify Email'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Enter your email address...';
    case 1:
      return 'Enter code...';
    default:
      return 'Unknown step';
  }
}

function getStepLabel(step) {
  switch (step) {
    case 0:
      return 'Email';
    case 1:
      return 'Code';
    default:
      return null;
  }
}

const dialog_content = (classes, login_step, on_value_change, login_request_result) => {
  
  const steps = getSteps();

  return (
    <DialogContent>
        <DialogContentText>

      <div className={classes.root}>
        <Stepper activeStep={login_step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

      <div>
        {login_step === steps.length ? (

          <div>
            <Typography className={classes.instructions}>You've logined successfully</Typography>
          </div>

        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(login_step)}</Typography>
            {login_step===0 &&
            <TextBox 
              id={getStepLabel(login_step)} 
              label={getStepLabel(login_step)} 
              required={true} 
              read_only={false}
              on_value_change={on_value_change}
            />}
            {login_step===1 &&
            <TextBox 
              id={getStepLabel(login_step)} 
              label={getStepLabel(login_step)} 
              required={true} 
              read_only={false}
              on_value_change={on_value_change}
            />}
            {login_request_result && 
            <Typography className={classes.instructions}>{login_request_result}</Typography>
            }
          </div>

        )}
      </div>

    </div>

    </DialogContentText>

    </DialogContent>
  );
};

export default function LoginDialog({ 
  on_close, 
  open, 
  login, 
  send_verification_code, 
  login_step, 
  login_request_result,
  login_request_is_fetching,
  email,
  open_profile_menu }) {
  const classes = useStyles();

  var submit_email = email;
  var verification_code = null;

  const on_value_change = (result) => {
    if (result['id'] === getStepLabel(0)) {
      submit_email = result['value'];
    }
    if (result['id'] === getStepLabel(1)) {
      verification_code = result['value'];
    }
  };

  const login_handle = () => {
    if(submit_email === null) {
      return;
    }
    login(submit_email);
  };

  const verify_handle = () => {
    if(verification_code === null) {
      return;
    }
    send_verification_code(submit_email, verification_code);
  }

  return (
    <div className={classes.root}>
      <Dialog 
        open={open} 
        onClose={on_close} 
        aria-labelledby="form-dialog-title">
          {dialog_title()}
          {dialog_content(classes, login_step, on_value_change, login_request_result)}
          {dialog_actions(login_step, login_handle, verify_handle, login_request_is_fetching, open_profile_menu)}
      </Dialog>
    </div>
  );
}
