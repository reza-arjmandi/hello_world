import React from 'react';

import {action} from '@storybook/addon-actions';

import TextBox from '../components/TextBox';

export default {
    component: TextBox,
    title: 'TextBox',
    excludeStories: /.*_data$/, 
};

export const text_field_data = {
    id: "ID",
    label: "this is label",
};

export const action_data = {
    on_value_change : action('on_value_change'),
};

export const required_text_box_data = {
    required : true,
};

export const not_required_text_box_data = {
    required : false,
};

export const read_only_text_box_data = {
    read_only : true,
};

export const not_read_only_text_box_data = {
    read_only : false,
};

export const NotReadOnlyRequiredTextBox = () => {
    return <TextBox 
        {...text_field_data} 
        {...action_data} 
        {...required_text_box_data}
        {...not_read_only_text_box_data} />
}

export const NotReadOnlyNotRequiredTextBox = () => {
    return <TextBox 
        {...text_field_data} 
        {...action_data} 
        {...not_required_text_box_data}
        {...not_read_only_text_box_data} />
}

export const ReadOnlyRequiredTextBox = () => {
    return <TextBox 
        {...text_field_data} 
        {...action_data} 
        {...required_text_box_data}
        {...read_only_text_box_data} />
}

export const ReadOnlyNotRequiredTextBox = () => {
    return <TextBox 
        {...text_field_data} 
        {...action_data} 
        {...not_required_text_box_data}
        {...read_only_text_box_data} />
}

