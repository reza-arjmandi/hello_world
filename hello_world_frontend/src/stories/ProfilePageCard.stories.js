import React from 'react';

import ProfilePageCard from '../components/ProfilePageCard';
import {action} from '@storybook/addon-actions';


export default {
    component: ProfilePageCard,
    title: 'ProfilePageCard',
    excludeStories: /.*_data$/,
};

export const actions_data = {
    handle1: action('handle1'),
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
    }
}


export const Default = () => {
    return <ProfilePageCard {...profile_page_card_data} {...actions_data} />;
};
