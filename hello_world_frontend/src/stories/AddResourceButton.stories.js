import React from 'react';
import { action } from '@storybook/addon-actions';

import AddResourceButton from '../components/AddResourceButton';

export default {
    component: AddResourceButton,
    title: 'AddResourceButton',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onAddResource: action('onAddResource'),
};

export const resource_button_data = {
    resource_name: 'Resource',
};

export const enable_add_resource_data = {
    is_enable_add_resource: true,
};

export const disable_add_resource_data = {
    is_enable_add_resource: false,
};

export const EnableAddResource = () => {
    return <AddResourceButton 
        {...actions_data} 
        {...resource_button_data} 
        {...enable_add_resource_data}
        />;
};

export const DisableAddResource = () => {
    return <AddResourceButton 
        {...actions_data} 
        {...resource_button_data} 
        {...disable_add_resource_data}
        />;
};