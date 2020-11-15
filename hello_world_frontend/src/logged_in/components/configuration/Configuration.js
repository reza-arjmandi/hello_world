import * as React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import UserType from './UserType';
import ChooseTimezone from './ChooseTimezone';
import SkypeID from './SkypeID';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.halloenglish.com/">
        Hello World
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Are you...', 'Your timezone', 'Skype ID'];

function getStepContent(
    step, 
    set_user_type, 
    user_type,
    set_timezone,
    timezone, 
    set_skype_link,
    skype_link, 
  ) {
  switch (step) {
    case 0:
      return <UserType set_user_type={set_user_type} user_type={user_type} />;
    case 1:
      return <ChooseTimezone set_timezone={set_timezone} timezone={timezone} />;
    case 2:
      return <SkypeID set_skype_link={set_skype_link} skype_link={skype_link} />;
    default:
      throw new Error('Unknown step');
  }
}

function Configuration({
  history,
  profile_info, 
  send_profile_info_handle,
  log_out,
  }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [user_type, set_user_type] = React.useState('learner');
  const [timezone, set_timezone] = React.useState('');
  const [skype_link, set_skype_link] = React.useState('');

  const handle_finish = () => {
    send_profile_info_handle(
      profile_info['url'], 
      user_type, 
      timezone, 
      skype_link, 
      profile_info['Avatar']);
  };

  const handleNext = () =>  {
    if(activeStep === steps.length - 1) {
      handle_finish()
    }
    setActiveStep(activeStep + 1);
  };

  const handleExit = () =>  {
    log_out();
    history.push("/");
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Hello World!
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Configuration
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for configure your profile.
                </Typography>
                {/* <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography> */}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(
                  activeStep, 
                  set_user_type, 
                  user_type,
                  set_timezone,
                  timezone, 
                  set_skype_link,
                  skype_link, 
                  )}
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleExit}
                    className={classes.button}
                  >
                    Exit
                  </Button>
                  
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

export default withRouter(Configuration);
