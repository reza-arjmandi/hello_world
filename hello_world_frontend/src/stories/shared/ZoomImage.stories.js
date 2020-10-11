import React from 'react';

import { action } from '@storybook/addon-actions';
import ZoomImage from '../../shared/components/ZoomImage';

export default {
    component: ZoomImage,
    title: 'Shared/components/ZoomImage',
    excludeStories: /.*_data$/, 
};

export const Default = () => {
    return <ZoomImage />;
}