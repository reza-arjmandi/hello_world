import React from 'react';

import { action } from '@storybook/addon-actions';
import WaveBorder from '../../shared/components/WaveBorder';

export default {
    component: WaveBorder,
    title: 'Shared/components/WaveBorder',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

export const wave_border_data = {
    upperColor:"#FFFFFF",
    lowerColor:"#F21220",
    animationNegativeDelay:4,
};

export const Default = () => {
    return <WaveBorder 
        {...wave_border_data}
    />;
}