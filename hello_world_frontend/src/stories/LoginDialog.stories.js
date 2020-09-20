import React from 'react';

import {action} from '@storybook/addon-actions';
import LoginDialog from '../components/LoginDialog';

export default {
    component: LoginDialog,
    title: 'LoginDialog',
    excludeStories: /.*_data$/, 
};

export const action_data = {
    on_close : action('on_close'),
    login : action('login'),
    send_verification_code : action('send_verification_code'),
};

export const dialog_step_submit_email_data = {
    open: true,
    login_step: 0,
};

export const dialog_step_verify_email_data = {
    open: true,
    login_step: 1,
};

export const dialog_step_final_data = {
    open: true,
    login_step: 2,
};

export const StepSubmitEmail = () => {
    return <LoginDialog {...dialog_step_submit_email_data} {...action_data} />;
}

export const StepVerifyEmail = () => {
    return <LoginDialog {...dialog_step_verify_email_data} {...action_data} />;
}

export const StepFinalEmail = () => {
    return <LoginDialog {...dialog_step_final_data} {...action_data} />;
}