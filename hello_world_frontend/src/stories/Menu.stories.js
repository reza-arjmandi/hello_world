import React from 'react';

import Menu from '../components/Menu';

import {open_menu_data} from './MenuDrawer.stories'
import {close_menu_data} from './MenuDrawer.stories'
import {menu_drawer_action_data} from './MenuDrawer.stories'

import {menu_actions_data} from './ButtonAppBar.stories'
import {button_app_bar_data} from './ButtonAppBar.stories'
import {server_started_data} from './LoginButton.stories'
import {server_not_started_data} from './LoginButton.stories'
import {server_button_actions_data} from './LoginButton.stories'
import {fetching_data} from './LoginButton.stories';

export default {
    component: Menu,
    title: 'Menu',
    excludeStories: /.*_data$/, 
};

export const OpenMenuAndRecordStarted = () => {
    return <Menu 
        {...open_menu_data} 
        {...menu_drawer_action_data} 
        {...server_started_data}
        {...button_app_bar_data}
        {...menu_actions_data}
        {...server_button_actions_data}/>
}

export const CloseMenuAndRecordStarted = () => {
    return <Menu 
        {...close_menu_data} 
        {...menu_drawer_action_data}
        {...server_started_data}
        {...button_app_bar_data}
        {...menu_actions_data}
        {...server_button_actions_data}/>
}

export const OpenMenuAndRecordNotStarted = () => {
    return <Menu 
        {...open_menu_data} 
        {...menu_drawer_action_data} 
        {...server_not_started_data}
        {...button_app_bar_data}
        {...menu_actions_data}
        {...server_button_actions_data}/>
}

export const CloseMenuAndRecordNotStarted = () => {
    return <Menu 
        {...close_menu_data} 
        {...menu_drawer_action_data}
        {...server_not_started_data}
        {...button_app_bar_data}
        {...menu_actions_data}
        {...server_button_actions_data}/>
}


export const OpenMenuAndRecordIsFetching = () => {
    return <Menu 
        {...open_menu_data} 
        {...menu_drawer_action_data} 
        {...server_not_started_data}
        {...button_app_bar_data}
        {...menu_actions_data}
        {...server_button_actions_data}
        {...fetching_data}/>
}

export const CloseMenuAndRecordIsFetching = () => {
    return <Menu 
        {...close_menu_data} 
        {...menu_drawer_action_data}
        {...server_not_started_data}
        {...button_app_bar_data}
        {...menu_actions_data}
        {...server_button_actions_data}
        {...fetching_data}/>
}