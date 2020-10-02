import React from 'react';

import Page from '../components/Page';
import {action} from '@storybook/addon-actions';

import {grid_data} from './ResourceCardsGrid.stories';

export default {
    component: Page,
    title: 'Page',
    excludeStories: /.*_data$/,
};

export const actions_data = {
    update_resource: action('update_resource'),
    delete_resource: action('delete_resource'),
}

export const home_page_data = {
    is_fetching: false,
    page_name: "home",
    page_data: {
        "count": 1,
        "next": null,
        "previous": null,
        "results": [
            {
                "url": "http://127.0.0.1:8000/home_page/3/",
                "id": 3,
                "background_image": "http://127.0.0.1:8000/home_page/photos/background.jpg",
                "introduction_video_url": "https://www.youtube.com/watch?v=e53lkKrfhew",
                "introduction_video_title": "Introduction",
                "introduction_video_description": "To see how to Hello World service works just play the video"
            }
        ]
    }
}

export const login_profile_page_data = {
    is_fetching: false,
    page_name: "profile",
    is_login: true
}

export const Fetching = () => {
    return <Page is_fetching={true} {...actions_data} />;
};

export const HomePage = () => {
    return <Page {...home_page_data} {...actions_data} />;
};

export const ResourcePage = () => {
    return <Page {...grid_data} {...actions_data} />;
};

export const LoginProfilePage = () => {
    return <Page {...login_profile_page_data}  />;
};