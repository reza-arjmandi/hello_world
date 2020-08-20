import React from 'react';

import HomePage from '../components/HomePage';
import {home_page_card_data} from './HomePageCard.stories'

export default {
    component: HomePage,
    title: 'HomePage',
    excludeStories: /.*_data$/,
};

export const home_page_data = {
    background_image: `url(http://127.0.0.1:8000/home_page/photos/background.jpg)`,
};

export const Default = () => {
    return <HomePage {...home_page_card_data} {...home_page_data} />;
};