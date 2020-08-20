import React from 'react';

import ParityField from '../components/ParityField';
import { action_data } from './TextBox.stories';

export default {
    component: ParityField,
    title: 'ParityField',
};

export const Default = () => {
    return <ParityField {...action_data}/>;
};