import React from 'react';

import { action } from '@storybook/addon-actions';
import DialogTitleWithCloseIcon from '../../shared/components/DialogTitleWithCloseIcon';

export default {
    component: DialogTitleWithCloseIcon,
    title: 'Shared/components/DialogTitleWithCloseIcon',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
    onClose: action('onClose'),
};

export const Default = () => {
    return <DialogTitleWithCloseIcon
    title="Title"
    {...actions_data}
    disabled={true}
    />;
}