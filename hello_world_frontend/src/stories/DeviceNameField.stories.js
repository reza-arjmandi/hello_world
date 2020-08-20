import React from 'react';

import DeviceNameField from '../components/DeviceNameField';
import { action_data } from './TextBox.stories';

export default {
    component: DeviceNameField,
    title: 'DeviceNameField',
};

export const Default = () => {
    return <DeviceNameField {...action_data}/>;
};