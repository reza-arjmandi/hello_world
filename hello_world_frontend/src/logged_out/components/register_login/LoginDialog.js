import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles,
} from "@material-ui/core";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
// import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});


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

function LoginDialog(props) {
  const {
    setStatus,
    history,
    classes,
    onClose,
    openChangePasswordDialog,
    status,
    loginCodeStatus,
    setLoginCodeStatus,
    login,
    send_verification_code,
    login_step,
    login_request_result,
    login_request_is_fetching,
    email,
    open_profile_menu,
  } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginEmail = useRef();
  const loginCode = useRef();
  // const loginPassword = useRef();

  const submitHandler = useCallback(() => {
    setLoginCodeStatus(null);
    setStatus(null);
    if (login_step === 0) {
      login(loginEmail.current.value);
    } else if (login_step === 1) {
      send_verification_code(email, loginCode.current.value);
    } else if (login_step === 2) {
      onClose();
      setTimeout(() => {
        open_profile_menu(history);
      }, 150);
    }
  }, [loginEmail, loginCode, login_step, history, setStatus]);

  const steps = getSteps();

  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={login_request_is_fetching}
        onFormSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
        hideBackdrop
        headline="Login"
        content={
          <Fragment>
            <Stepper activeStep={login_step} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {login_step===0 &&
              <TextField
                variant="outlined"
                margin="none"
                error={status === "invalidEmail"}
                required
                fullWidth
                label="Email Address"
                inputRef={loginEmail}
                autoFocus
                autoComplete="off"
                type="email"
                onChange={() => {
                  if (status === "invalidEmail") {
                    setStatus(null);
                  }
                }}
                helperText={
                  status === "invalidEmail" &&
                  "This email address isn't associated with an account."
                }
                FormHelperTextProps={{ error: true }}
              />
            }
            {login_step===1 &&
              <TextField
                variant="outlined"
                margin="none"
                error={login_request_result === "invalidCode"}
                required
                fullWidth
                label="Login Code"
                inputRef={loginCode}
                autoFocus
                autoComplete="off"
                onChange={() => {
                  if (login_request_result === "invalidCode") {
                    setLoginCodeStatus(null);
                  }
                }}
                helperText={
                  login_request_result === "invalidCode" &&
                  "This code isn't valid."
                }
                FormHelperTextProps={{ error: true }}
              />
            }

            {/* <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidPassword"}
              label="Password"
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === "invalidPassword") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidPassword" ? (
                  <span>
                    Incorrect password. Try again, or click on{" "}
                    <b>&quot;Forgot Password?&quot;</b> to reset it.
                  </span>
                ) : (
                  ""
                )
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            /> */}
            {login_request_result &&
            <Typography className={classes.instructions}>{login_request_result}</Typography>
            }
            {/* <FormControlLabel
              className={classes.formControlLabel}
              control={<Checkbox color="primary" />}
              label={<Typography variant="body1">Remember me</Typography>}
            /> */}
            {/* {status === "verificationEmailSend" ? (
              <HighlightedInformation>
                We have send instructions on how to reset your password to your
                email address
              </HighlightedInformation>
            ) : (
              <HighlightedInformation>
                Email is: <b>test@web.com</b>
                <br />
                Password is: <b>HaRzwc</b>
              </HighlightedInformation>
            )} */}
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={login_request_is_fetching}
              size="large"
            >
              {login_step === 0 && "Login"}
              {login_step === 1 && "Send Code"}
              {login_step === 2 && 'Finish'}
              {login_request_is_fetching && <ButtonCircularProgress />}
            </Button>

            {/* <Typography
              align="center"
              className={classNames(
                classes.forgotPassword,
                isLoading ? classes.disabledText : null
              )}
              color="primary"
              onClick={isLoading ? null : openChangePasswordDialog}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => {
                // For screenreaders listen to space and enter events
                if (
                  (!isLoading && event.keyCode === 13) ||
                  event.keyCode === 32
                ) {
                  openChangePasswordDialog();
                }
              }}
            >
              Forgot Password?
            </Typography> */}
          </Fragment>
        }
      />
    </Fragment>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default withRouter(withStyles(styles)(LoginDialog));
