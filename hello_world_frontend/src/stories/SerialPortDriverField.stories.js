import React from 'react';

import SerialPortDriverField from '../components/SerialPortDriverField';
import { action_data } from './TextBox.stories';

export default {
    component: SerialPortDriverField,
    title: 'SerialPortDriverField',
};

export const Default = () => {
    return <SerialPortDriverField {...action_data} />;
};