import React from 'react';

import BaudRateField from '../components/BaudRateField';
import { action_data } from './TextBox.stories';

export default {
    component: BaudRateField,
    title: 'BaudRateField',
};

export const Default = () => {
    return <BaudRateField {...action_data} />;
};