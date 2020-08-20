import * as types from '../constants/ActionTypes';

export const open_add_new_resource_dialog = () => ({ 
    type: types.OPEN_ADD_NEW_RESOURCE_DIALOG 
});

export const close_add_new_resource_dialog = () => ({ 
    type: types.CLOSE_ADD_NEW_RESOURCE_DIALOG 
});

export const fetch_logs_request = () => ({
    type: types.FETCH_RESOURCES_REQUEST,
    description: 'Fetching logs...'
});

export const fetch_logs_failure = (error) => ({
    type: types.FETCH_RESOURCES_FAILURE,
    description: 'Fetching of logs failed.',
    error
});

export const fetch_logs_success = (response) => ({
    type: types.FETCH_RESOURCES_SUCCESS,
    description: 'Fetching of logs succeeded.',
    response
});

export const fetch_server_status_request = () => ({
    type: types.FETCH_SERVER_STATUS_REQUEST,
    description: 'Fetching server status...'
});

export const fetch_server_status_failure = (error) => ({
    type: types.FETCH_SERVER_STATUS_FAILURE,
    description: 'Fetching of server status failed.',
    error
});

export const fetch_server_status_success = ({ is_started }) => ({
    type: types.FETCH_SERVER_STATUS_SUCCESS,
    description: 'Fetching of server status succeeded.',
    is_started
});

export const insert_resource_request = () => ({ 
    type: types.INSERT_RESOURCE_REQUEST,
    description: 'Inserting a resource...'
});

export const insert_resource_success = () => ({ 
    type: types.INSERT_RESOURCE_SUCCESS,
    description: 'Inserting the resource succeeded.'
});

export const insert_resource_failure = (error) => ({ 
    type: types.INSERT_RESOURCE_FAILURE,
    description: 'Inserting the log failed.',
    error
});

export const delete_log_request = () => ({ 
    type: types.DELETE_LOG_REQUEST,
    description: 'Deleting a log...'
});

export const delete_log_success = () => ({ 
    type: types.DELETE_LOG_SUCCESS,
    description: 'Deleting of the log succeeded.'
});

export const delete_log_failure = (error) => ({ 
    type: types.DELETE_LOG_FAILURE,
    description: 'Deleting of the log failed.',
    error
});

export const download_log_file_request = () => ({ 
    type: types.DOWNLOAD_LOG_FILE_REQUEST,
    description: 'downloading the log file...'
});

export const download_log_file_success = () => ({ 
    type: types.DOWNLOAD_LOG_FILE_SUCCESS,
    description: 'Downloading of the log file succeeded.'
});

export const download_log_file_failure = (error) => ({ 
    type: types.DOWNLOAD_LOG_FILE_FAILURE,
    description: 'Downloading of the log file failed.',
    error
});

export const start_server_request = () => ({ 
    type: types.start_server_REQUEST,
    description: 'start server...'
});

export const start_server_success = () => ({ 
    type: types.start_server_SUCCESS,
    description: 'starting of server succeeded.'
});

export const start_server_failure = (error) => ({ 
    type: types.start_server_FAILURE,
    description: 'starting of server failed.',
    error
});

export const stop_server_request = () => ({ 
    type: types.stop_server_REQUEST,
    description: 'stop server...'
});

export const stop_server_success = () => ({ 
    type: types.stop_server_SUCCESS,
    description: 'stoping of server succeeded.'
});

export const stop_server_failure = (error) => ({ 
    type: types.stop_server_FAILURE,
    description: 'stoping of server failed.',
    error
});

export const close_menu = () => ({ 
    type: types.CLOSE_MENU,
});

export const open_menu = () => ({ 
    type: types.OPEN_MENU,
});

export const click_menu = (menu_title) => ({ 
    type: types.CLICK_MENU,
    menu_title
});

export const fetch_menu_list_request = () => ({
    type: types.FETCH_MENU_LIST_REQUEST,
    description: 'Fetching menu list...'
});

export const fetch_menu_list_failure = (error) => ({
    type: types.FETCH_MENU_LIST_FAILURE,
    description: 'Fetching of menu list failed.',
    error
});

export const fetch_menu_list_success = (response) => ({
    type: types.FETCH_MENU_LIST_SUCCESS,
    description: 'Fetching of menu list succeeded.',
    response
});

export const fetch_menu_resources_options_request = () => ({
    type: types.FETCH_MENU_RESOURCES_OPTIONS_REQUEST,
    description: 'Fetching menu resource options list...'
});

export const fetch_menu_resources_options_failure = (error) => ({
    type: types.FETCH_MENU_RESOURCES_OPTIONS_FAILURE,
    description: 'Fetching of menu resource options failed.',
    error
});

export const fetch_menu_resources_options_success = (response) => ({
    type: types.FETCH_MENU_RESOURCES_OPTIONS_SUCCESS,
    description: 'Fetching of menu resource options succeeded.',
    response
});

export const fetch_resources_request = () => ({
    type: types.FETCH_RESOURCES_REQUEST,
    description: 'Fetching resources...'
});

export const fetch_resources_failure = (error) => ({
    type: types.FETCH_RESOURCES_FAILURE,
    description: 'Fetching resources failed.',
    error
});

export const fetch_resources_success = (response) => ({
    type: types.FETCH_RESOURCES_SUCCESS,
    description: 'Fetching resources succeeded.',
    response
});

export const login = (response) => ({
    type: types.LOGIN,
    response
});

export const change_page_number = (number) => ({
    type: types.CHANGE_PAGE_NUMBER,
    number
});