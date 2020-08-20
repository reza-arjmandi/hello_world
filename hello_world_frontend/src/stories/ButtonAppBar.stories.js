import React from 'react';
import { action } from '@storybook/addon-actions';

import ButtonAppBar from '../components/ButtonAppBar';
import { server_started_data } from './LoginButton.stories';
import { server_not_started_data } from './LoginButton.stories';
import { fetching_data } from './LoginButton.stories';
import { server_button_actions_data } from './LoginButton.stories';

export default {
    component: ButtonAppBar,
    title: 'ButtonAppBar',
    excludeStories: /.*_data$/, 
};

export const menu_actions_data = {
    open_menu: action('open_menu'),
};

export const button_app_bar_data = {
    title : 'Instafarm Server',
};

export const menu_open_data = {
    menu_is_open: true
};

export const menu_close_data = {
    menu_is_open: false
};

export const RecordStartedAndMenuClosed = () => {
    return <ButtonAppBar 
        {...server_started_data} 
        {...menu_actions_data} 
        {...server_button_actions_data} 
        {...button_app_bar_data}
        {...menu_close_data}
        />;
}

export const RecordNotStartedAndMenuClosed = () => {
    return <ButtonAppBar 
        {...server_not_started_data} 
        {...menu_actions_data} 
        {...server_button_actions_data} 
        {...button_app_bar_data}
        {...menu_close_data}
        />;
}

export const FetchingAndMenuClosed = () => {
    return <ButtonAppBar 
        {...fetching_data} 
        {...menu_actions_data} 
        {...button_app_bar_data}
        {...menu_close_data}
        />;
}

export const RecordStartedAndMenuOpened = () => {
    return <ButtonAppBar 
        {...server_started_data} 
        {...menu_actions_data} 
        {...server_button_actions_data} 
        {...button_app_bar_data}
        {...menu_open_data}
        />;
}

export const RecordNotStartedAndMenuOpened = () => {
    return <ButtonAppBar 
        {...server_not_started_data} 
        {...menu_actions_data} 
        {...server_button_actions_data} 
        {...button_app_bar_data}
        {...menu_open_data}
        />;
}

export const FetchingAndMenuOpened = () => {
    return <ButtonAppBar 
        {...fetching_data} 
        {...menu_actions_data} 
        {...button_app_bar_data}
        {...menu_open_data}
        />;
}