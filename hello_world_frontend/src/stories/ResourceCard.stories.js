import React from 'react';

import ResourceCard from '../components/ResourceCard';
import {action} from '@storybook/addon-actions';

export default {
    component: ResourceCard,
    title: 'ResourceCard',
    excludeStories: /.*_data$/,
};

export const resource_card_data = {
    url: "http://127.0.0.1:8000/stream/1/",
    id: 1,
    title: "I can't say NO",
    description: "We had a talk with Mariana from Moscow about 'I can't say NO'. Mariana is a multilingual girl. She can speaks in English, Portuguese and French. She is a athlete and an English teacher.",
    stream_url: "https://youtu.be/hd3fAskC3Rw"
};

export const actions_data = {
    update_log: action('update_log'),
    delete_log: action('delete_log'),
    download_log: action('download_log'),
};

export const Default = () => {
    return <ResourceCard {...resource_card_data} {...actions_data}/>;
};