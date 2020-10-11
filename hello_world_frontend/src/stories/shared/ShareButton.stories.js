import React from 'react';

import { action } from '@storybook/addon-actions';
import ShareButton from '../../shared/components/ShareButton';

export default {
    component: ShareButton,
    title: 'Shared/components/ShareButton',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClick: action('onClick'),
};

export const shared_button_data = {
    title:"React SaaS Template",
    description:"I found an awesome template for an webapp using React!",
    variant:"contained",
    className:"text-white",
    classes:{
        label: "text-white",
    },
};

export const Facebook = () => {
    return <ShareButton
        {...actions_data}
        {...shared_button_data}
        disableElevation
        type="Facebook"
  />;
}

export const Twitter = () => {
    return <ShareButton
        {...actions_data}
        {...shared_button_data}
        disableElevation
        type="Twitter"
  />;
}

export const Reddit = () => {
    return <ShareButton
        {...actions_data}
        {...shared_button_data}
        disableElevation
        type="Reddit"
  />;
}

export const Tumblr = () => {
    return <ShareButton
        {...actions_data}
        {...shared_button_data}
        disableElevation
        type="Tumblr"
  />;
}