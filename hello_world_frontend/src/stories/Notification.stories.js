import React from 'react';

import Notification from '../components/Notification';

export default {
    component: Notification,
    title: 'Notification',
    excludeStories: /.*_data$/, 
};

export const notification_data = {
    open: true,
    message: "this is a message",
};

export const SuccessNotifcation = () => {
    return <Notification {...notification_data} type='success'/>;
};

export const WarningNotifcation = () => {
    return <Notification {...notification_data} type='warning'/>;
};

export const InfoNotifcation = () => {
    return <Notification {...notification_data} type='info'/>;
};

export const ErrorNotifcation = () => {
    return <Notification {...notification_data} type='error'/>;
};