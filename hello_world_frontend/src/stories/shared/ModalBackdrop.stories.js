import React from 'react';

import ModalBackdrop from '../../shared/components/ModalBackdrop';

export default {
    component: ModalBackdrop,
    title: 'Shared/components/ModalBackdrop',
    excludeStories: /.*_data$/, 
};

export const Default = () => {
    return <ModalBackdrop open/>;
}