import React from 'react';
import {action} from '@storybook/addon-actions';

import LogDialogSelectField from '../components/LogDialogSelectField';

export default {
    component: LogDialogSelectField,
    title: 'LogDialogSelectField',
    excludeStories: /.*_data$/, 
};

export const action_data = {
    on_change: action('on_change'),
};

export const select_field_data = {
    id: "ID",
    label: "label",
    value: "item1",
    items: ["item1", "item2", "item3"],
};

export const Default = () => {
    return <LogDialogSelectField {...action_data} {...select_field_data} />;
};