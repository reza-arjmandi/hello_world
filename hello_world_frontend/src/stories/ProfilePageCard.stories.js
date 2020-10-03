import React from 'react';

import ProfilePageCard from '../components/ProfilePageCard';
import {action} from '@storybook/addon-actions';


export default {
    component: ProfilePageCard,
    title: 'ProfilePageCard',
    excludeStories: /.*_data$/,
};

export const actions_data = {
    update_profile_info: action('update_profile_info'),
}

export const profile_page_card_data = {
    profile_info: {
        url: "http://127.0.0.1:8000/profile/1/",
        id: 1,
        owner: "ali@gmail.com",
        user_type: "learner",
        timezone: "Asia/Tehran",
        skype_link: "id:12345",
        is_completed: true,
        Avatar: [
            "http://127.0.0.1:8000/avatar/1/"
        ]
    },
    is_updating_profile_info: false,
    is_updating_profile_info_success: false,
}

export const profile_page_card_updating_data = {
    profile_info: {
        url: "http://127.0.0.1:8000/profile/1/",
        id: 1,
        owner: "ali@gmail.com",
        user_type: "learner",
        timezone: "Asia/Tehran",
        skype_link: "id:12345",
        is_completed: true,
        Avatar: [
            "http://127.0.0.1:8000/avatar/1/"
        ]
    },
    is_updating_profile_info: true,
    is_updating_profile_info_success: false,
}

export const profile_page_card_updating_succeeded_data = {
    profile_info: {
        url: "http://127.0.0.1:8000/profile/1/",
        id: 1,
        owner: "ali@gmail.com",
        user_type: "learner",
        timezone: "Asia/Tehran",
        skype_link: "id:12345",
        is_completed: true,
        Avatar: [
            "http://127.0.0.1:8000/avatar/1/"
        ]
    },
    is_updating_profile_info: false,
    is_updating_profile_info_success: true,
}

export const Default = () => {
    return <ProfilePageCard {...profile_page_card_data} {...actions_data} />;
};

export const Updating = () => {
    return <ProfilePageCard {...profile_page_card_updating_data} {...actions_data} />;
};

export const UpdatingSucceeded = () => {
    return <ProfilePageCard {...profile_page_card_updating_succeeded_data} {...actions_data} />;
};