import React from 'react';

import Menu from '../components/Menu';

import {open_menu_data} from './MenuDrawer.stories'
import {close_menu_data} from './MenuDrawer.stories'
import {menu_drawer_action_data} from './MenuDrawer.stories'

import {menu_actions_data} from './ButtonAppBar.stories'
import {button_app_bar_data} from './ButtonAppBar.stories'
import {log_in_data} from './LoginButton.stories'
import {log_out_data} from './LoginButton.stories'
import {login_logout_actions_data} from './LoginButton.stories'

export default {
    component: Menu,
    title: 'Menu',
    excludeStories: /.*_data$/, 
};

export const OpenMenuAndNotLoging = () => {
    return <Menu 
        {...open_menu_data} 
        {...menu_drawer_action_data} 
        {...log_out_data}
        {...button_app_bar_data}
        {...menu_actions_data}
        {...login_logout_actions_data}/>
}

export const CloseMenuAndNotLogin = () => {
    return <Menu 
        {...close_menu_data} 
        {...menu_drawer_action_data}
        {...log_out_data}
        {...button_app_bar_data}
        {...menu_actions_data}
        {...login_logout_actions_data}/>
}

export const OpenMenuAndLogin = () => {
    return <Menu 
        {...open_menu_data} 
        {...menu_drawer_action_data} 
        {...log_in_data}
        {...button_app_bar_data}
        {...menu_actions_data}
        {...login_logout_actions_data}/>
}

export const CloseMenuAndLogin = () => {
    return <Menu 
        {...close_menu_data} 
        {...menu_drawer_action_data}
        {...log_in_data}
        {...button_app_bar_data}
        {...menu_actions_data}
        {...login_logout_actions_data}/>
}
