import React from 'react';

import {action} from '@storybook/addon-actions';

import MenuDrawer from '../components/MenuDrawer';

export default {
    component: MenuDrawer,
    title: 'MenuDrawer',
    excludeStories: /.*_data$/, 
};

export const open_menu_data = {
    menu_is_open: true,
    menu_list : 
    {
        "accounts": "http://127.0.0.1:8000/accounts/",
        "comments": "http://127.0.0.1:8000/comments/",
        "instagram_accounts": "http://127.0.0.1:8000/instagram_accounts/",
        "errors": "http://127.0.0.1:8000/errors/",
        "ignores": "http://127.0.0.1:8000/ignores/",
        "promote_scenarios": "http://127.0.0.1:8000/promote_scenarios/",
        "tags": "http://127.0.0.1:8000/tags/"
    }
};

export const close_menu_data = {
    menu_is_open: false,
    menu_list : 
    {
        "accounts": "http://127.0.0.1:8000/accounts/",
        "comments": "http://127.0.0.1:8000/comments/",
        "instagram_accounts": "http://127.0.0.1:8000/instagram_accounts/",
        "errors": "http://127.0.0.1:8000/errors/",
        "ignores": "http://127.0.0.1:8000/ignores/",
        "promote_scenarios": "http://127.0.0.1:8000/promote_scenarios/",
        "tags": "http://127.0.0.1:8000/tags/"
    }
};

export const menu_drawer_action_data = {
    on_close_menu : action('on_close_menu'),
    on_menu_clicked: action('on_menu_clicked')
};

export const OpenMenu = () => {
    return <MenuDrawer {...open_menu_data} {...menu_drawer_action_data} />
}

export const CloseMenu = () => {
    return <MenuDrawer {...close_menu_data} {...menu_drawer_action_data} />
}