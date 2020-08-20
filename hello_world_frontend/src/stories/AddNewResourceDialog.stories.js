import React from 'react';

import {action} from '@storybook/addon-actions';
import AddNewResourceDialog from '../components/AddNewResourceDialog';

export default {
    component: AddNewResourceDialog,
    title: 'AddNewResourceDialog',
    excludeStories: /.*_data$/, 
};

export const action_data = {
    on_close : action('on_close'),
    add_new_resource : action('add_new_resource'),
};

export const add_new_resource_dialog_data = {
    resource_name: 'Resource',
    open: true,
    post_options: {
        "id": {
            "type": "integer",
            "required": false,
            "read_only": true,
            "label": "ID"
        },
        "email": {
            "type": "email",
            "required": true,
            "read_only": false,
            "label": "Email",
            "max_length": 254
        },
        "password": {
            "type": "string",
            "required": true,
            "read_only": false,
            "label": "Password",
            "max_length": 100
        }
    },
};

export const Default = () => {
    return <AddNewResourceDialog {...add_new_resource_dialog_data} {...action_data} />;
}