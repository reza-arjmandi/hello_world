import React from 'react';
import {action} from '@storybook/addon-actions';

import Main from '../logged_out/components/Main';
export default {
    component: Main,
    title: 'LoggedOutMainPage',
    excludeStories: /.*_data$/, 
};

// export const action_data = {
//     on_change: action('on_change'),
// };

// export const select_field_data = {
//     id: "ID",
//     label: "label",
//     value: "item1",
//     items: ["item1", "item2", "item3"],
// };

export const Default = () => {
    return <Main  />;
};