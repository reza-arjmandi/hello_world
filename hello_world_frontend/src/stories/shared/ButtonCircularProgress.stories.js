import React from 'react';

import ButtonCircularProgress from '../../shared/components/ButtonCircularProgress';

export default {
    component: ButtonCircularProgress,
    title: 'Shared/components/ButtonCircularProgress',
    excludeStories: /.*_data$/, 
};

export const Default = () => {
    return <ButtonCircularProgress />;
}