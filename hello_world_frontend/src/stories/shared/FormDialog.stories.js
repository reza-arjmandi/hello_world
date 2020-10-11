import React from 'react';
import { useState, useCallback, useRef, Fragment } from "react";

import { action } from '@storybook/addon-actions';
import FormDialog from '../../shared/components/FormDialog';
import {
    TextField,
    Button,
    Checkbox,
    Typography,
    FormControlLabel,
    withStyles,
  } from "@material-ui/core";

import VisibilityPasswordTextField from "../../shared/components/VisibilityPasswordTextField";
import HighlightedInformation from "../../shared/components/HighlightedInformation";


export default {
    component: FormDialog,
    title: 'Shared/components/FormDialog',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

export const Default = () => {
    const loginEmail = useRef();
    const loginPassword = useRef();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    return <FormDialog
        open
        {...actions_data}
        loading={false}
        hideBackdrop
        headline="headline"
        // content={
        //     <Fragment>
        //       <TextField
        //         variant="outlined"
        //         margin="normal"
        //         error={status === "invalidEmail"}
        //         required
        //         fullWidth
        //         label="Email Address"
        //         inputRef={loginEmail}
        //         autoFocus
        //         autoComplete="off"
        //         type="email"
        //         onChange={() => {
        //           if (status === "invalidEmail") {
        //             setStatus(null);
        //           }
        //         }}
        //         helperText={
        //           status === "invalidEmail" &&
        //           "This email address isn't associated with an account."
        //         }
        //         FormHelperTextProps={{ error: true }}
        //       />
        //       <VisibilityPasswordTextField
        //         variant="outlined"
        //         margin="normal"
        //         required
        //         fullWidth
        //         error={status === "invalidPassword"}
        //         label="Password"
        //         inputRef={loginPassword}
        //         autoComplete="off"
        //         onChange={() => {
        //           if (status === "invalidPassword") {
        //             setStatus(null);
        //           }
        //         }}
        //         helperText={
        //           status === "invalidPassword" ? (
        //             <span>
        //               Incorrect password. Try again, or click on{" "}
        //               <b>&quot;Forgot Password?&quot;</b> to reset it.
        //             </span>
        //           ) : (
        //             ""
        //           )
        //         }
        //         FormHelperTextProps={{ error: true }}
        //         onVisibilityChange={setIsPasswordVisible}
        //         isVisible={isPasswordVisible}
        //       />
        //       <FormControlLabel
        //         // className={classes.formControlLabel}
        //         control={<Checkbox color="primary" />}
        //         label={<Typography variant="body1">Remember me</Typography>}
        //       />
        //       {/* {status === "verificationEmailSend" ? (
        //         <HighlightedInformation>
        //           We have send instructions on how to reset your password to your
        //           email address
        //         </HighlightedInformation>
        //       ) : (
        //         <HighlightedInformation>
        //           Email is: <b>test@web.com</b>
        //           <br />
        //           Password is: <b>HaRzwc</b>
        //         </HighlightedInformation>
        //       )} */}
        //     </Fragment>
        //   }
    />;
}