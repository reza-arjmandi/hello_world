import React from 'react';

import StopBitsField from '../components/StopBitsField';
import { action_data } from './TextBox.stories';

export default {
    component: StopBitsField,
    title: 'StopBitsField',
};

export const Default = () => {
    return <StopBitsField {...action_data} />;
};