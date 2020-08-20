import React from 'react';

import HomePageCard from '../components/HomePageCard';

export default {
    component: HomePageCard,
    title: 'HomePageCard',
    excludeStories: /.*_data$/,
};

export const home_page_card_data = {
    video_url: 'https://www.youtube.com/watch?v=e53lkKrfhew',
    video_title: 'Introduction',
    video_desciption: 'To see how to Hello World service works just play the video'
};

export const Default = () => {
    return <HomePageCard {...home_page_card_data} />;
};