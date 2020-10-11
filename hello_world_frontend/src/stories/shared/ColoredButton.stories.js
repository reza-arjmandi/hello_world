import React from 'react';

import { action } from '@storybook/addon-actions';
import ColoredButton from '../../shared/components/ColoredButton';

export default {
    component: ColoredButton,
    title: 'Shared/components/ColoredButton',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClick: action('onClick'),
};

export const Default = () => {
    return <ColoredButton
        {...actions_data}
        variant="contained"
        color="#3b5998"
    />;
}