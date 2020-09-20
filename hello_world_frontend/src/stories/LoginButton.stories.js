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
    email: "arjmandi.re@gmail.com",
};

export const log_out_data = {
    is_log_in: false,
};

export const login_logout_actions_data = {
    login: action('login'),
    logout: action('logout'),
};

export const Login = () => {
    return <LoginButton 
        {...log_in_data} 
        {...login_logout_actions_data}/>;
}

export const Logout = () => {
    return <LoginButton 
        {...log_out_data} 
        {...login_logout_actions_data}/>;
}