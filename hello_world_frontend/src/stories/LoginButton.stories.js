import React from 'react';

import LoginButton from '../components/LoginButton';
import { action } from '@storybook/addon-actions';

export default {
    component: LoginButton,
    title: 'LoginButton',
    excludeStories: /.*_data$/,
};

export const log_in_data = {
    is_log_in: true,
    profileObj: {
        "googleId": "110871827675639438900",
        "imageUrl": "https://lh3.googleusercontent.com/a-/AOh14GgLpqm_846VFDk1xqOkx-GImI53uo4gN68tLQBIAw=s96-c",
        "email": "arjmandi.re@gmail.com",
        "name": "Reza Arjmandi",
        "givenName": "Reza",
        "familyName": "Arjmandi"
      },
};

export const log_out_data = {
    is_log_in: false,
};

export const server_button_actions_data = {
    start_server: action('start_server'),
    stop_server: action('stop_server'),
};

export const Login = () => {
    return <LoginButton 
        {...log_in_data} 
        {...server_button_actions_data}/>;
}

export const Logout = () => {
    return <LoginButton 
        {...log_out_data} 
        {...server_button_actions_data}/>;
}