import React from 'react';

import ProfilePage from '../components/ProfilePage';
import {action} from '@storybook/addon-actions';


export default {
    component: ProfilePage,
    title: 'ProfilePage',
    excludeStories: /.*_data$/,
};

export const actions_data = {
    send_profile_info_handle: action('send_profile_info_handle'),
}

export const not_login_profile_page_data = {
    is_login: false,
    profile_request_is_fetching: false,
    
}

export const login_profile_page_data = {
    is_login: true,
    profile_request_is_fetching: false,
    profile_info : {
        "url": "http://127.0.0.1:8000/profile/1/",
        "id": 1,
        "owner": "ali@gmail.com",
        "user_type": "learner",
        "timezone": "invalid",
        "skype_link": "invalid",
        "is_completed": false,
        "Avatar": [
            "http://127.0.0.1:8000/avatar/1/"
        ]
    }
}

export const login_profile_page_completed = {
    is_login: true,
    profile_request_is_fetching: false,
    profile_info : {
        "url": "http://127.0.0.1:8000/profile/1/",
        "id": 1,
        "owner": "ali@gmail.com",
        "user_type": "learner",
        "timezone": "invalid",
        "skype_link": "invalid",
        "is_completed": true,
        "Avatar": [
            "http://127.0.0.1:8000/avatar/1/"
        ]
    }
}

export const login_profile_page_fetching_data = {
    is_login: true,
    profile_request_is_fetching: true,
    profile_info : {
        "url": "http://127.0.0.1:8000/profile/1/",
        "id": 1,
        "owner": "ali@gmail.com",
        "user_type": "learner",
        "timezone": "invalid",
        "skype_link": "invalid",
        "is_completed": false,
        "Avatar": [
            "http://127.0.0.1:8000/avatar/1/"
        ]
    }
}

export const NotLoginProfilePage = () => {
    return <ProfilePage 
        {...not_login_profile_page_data} 
          />;
};

export const LoginProfilePageSteps = () => {
    return <ProfilePage 
        {...login_profile_page_data}  
        {...actions_data} 
         />;
};

export const LoginProfilePageCompleted = () => {
    return <ProfilePage 
        {...login_profile_page_completed}  
        {...actions_data} 
         />;
};

export const ProfileFetching = () => {
    return <ProfilePage 
        {...login_profile_page_fetching_data}  
        />;
};