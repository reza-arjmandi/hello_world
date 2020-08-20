import React from 'react';

import FlowControlField from '../components/FlowControlField';
import { action_data } from './TextBox.stories';

export default {
    component: FlowControlField,
    title: 'FlowControlField',
};

export const Default = () => {
    return <FlowControlField {...action_data} />;
};