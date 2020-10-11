import React from 'react';

import { action } from '@storybook/addon-actions';
import VisibilityPasswordTextField from '../../shared/components/VisibilityPasswordTextField';

export default {
    component: VisibilityPasswordTextField,
    title: 'Shared/components/VisibilityPasswordTextField',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

export const Default = () => {
    return <VisibilityPasswordTextField />;
}