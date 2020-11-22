import * as types from '../constants/ActionTypes';

export const open_add_new_resource_dialog = () => ({ 
    type: types.OPEN_ADD_NEW_RESOURCE_DIALOG 
});

export const close_add_new_resource_dialog = () => ({ 
    type: types.CLOSE_ADD_NEW_RESOURCE_DIALOG 
});

export const open_login_dialog = () => ({ 
    type: types.OPEN_LOGIN_DIALOG 
});

export const close_login_dialog = () => ({ 
    type: types.CLOSE_LOGIN_DIALOG 
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

export const fetch_resources_success = (result) => ({
    type: types.FETCH_RESOURCES_SUCCESS,
    description: 'Fetching resources succeeded.',
    result
});

export const logout = (response) => ({
    type: types.LOGOUT,
    response
});

export const change_page_number = (number) => ({
    type: types.CHANGE_PAGE_NUMBER,
    number
});

export const set_auth_token = (token) => ({
    type: types.SET_AUTH_TOKEN,
    token
});

export const set_email = (email) => ({
    type: types.SET_EMAIL,
    email
});

export const login_request = (email) => ({ 
    type: types.LOGIN_REQUEST,
    description: 'Request login...',
    email
});

export const login_request_success = (result) => ({ 
    type: types.LOGIN_REQUEST_SUCCESS,
    description: 'Login request is succeeded.',
    result
});

export const login_request_failure = (error) => ({ 
    type: types.LOGIN_REQUEST_FAILURE,
    description: 'Login request is failed.',
    error
});

export const email_verification_request = () => ({ 
    type: types.EMAIL_VERIFICATION_REQUEST,
    description: 'Request email verification...'
});

export const email_verification_request_success = (result) => ({ 
    type: types.EMAIL_VERIFICATION_REQUEST_SUCCESS,
    description: 'Email verification request is succeeded.',
    result
});

export const email_verification_failure = (error) => ({ 
    type: types.EMAIL_VERIFICATION_REQUEST_FAILURE,
    description: 'Email verification request  is failed.',
    error
});

export const clear_login_request_result = () => ({ 
    type: types.CLEAR_LOGIN_REQUEST_RESULT,
});

export const send_profile_info_request = () => ({ 
    type: types.SEND_PROFILE_INFO_REQUEST,
    description: 'Sending profile info...'
});

export const send_profile_info_request_success = (result) => ({ 
    type: types.SEND_PROFILE_INFO_REQUEST_SUCCESS,
    description: 'Sending profile info is succeeded.',
    result
});

export const send_profile_info_request_failure = (error) => ({ 
    type: types.SEND_PROFILE_INFO_REQUEST_FAILURE,
    description: 'Sending profile info is failed.',
    error
});

export const fetch_profile_info_request = () => ({ 
    type: types.FETCH_PROFILE_INFO_REQUEST,
    description: 'Fetching profile info...'
});

export const fetch_profile_info_request_success = (result) => ({ 
    type: types.FETCH_PROFILE_INFO_REQUEST_SUCCESS,
    description: 'Fetching profile info is succeeded.',
    result
});

export const fetch_profile_info_request_failure = (error) => ({ 
    type: types.FETCH_PROFILE_INFO_REQUEST_FAILURE,
    description: 'Fetching profile info is failed.',
    error
});

export const fetch_profile_avatar_request = () => ({ 
    type: types.FETCH_PROFILE_AVATAR_REQUEST,
    description: 'Fetching profile avatar...'
});

export const fetch_profile_avatar_request_success = (result) => ({ 
    type: types.FETCH_PROFILE_AVATAR_REQUEST_SUCCESS,
    description: 'Fetching profile avatar is succeeded.',
    result
});

export const fetch_profile_avatar_request_failure = (error) => ({ 
    type: types.FETCH_PROFILE_AVATAR_REQUEST_FAILURE,
    description: 'Fetching profile avatar is failed.',
    error
});

export const fetch_blog_posts_request = () => ({ 
    type: types.FETCH_BLOG_POSTS_REQUEST,
    description: 'Fetching blog posts...'
});

export const fetch_blog_posts_request_success = (result) => ({ 
    type: types.FETCH_BLOG_POSTS_REQUEST_SUCCESS,
    description: 'Fetching blog posts is succeeded.',
    result
});

export const fetch_blog_posts_request_failure = (error) => ({ 
    type: types.FETCH_BLOG_POSTS_REQUEST_FAILURE,
    description: 'Fetching blog posts is failed.',
    error
});

export const fetch_videos_request = () => ({ 
    type: types.FETCH_VIDEOS_REQUEST,
    description: 'Fetching videos...'
});

export const fetch_videos_request_success = (result) => ({ 
    type: types.FETCH_VIDEOS_REQUEST_SUCCESS,
    description: 'Fetching videos is succeeded.',
    result
});

export const fetch_videos_request_failure = (error) => ({ 
    type: types.FETCH_VIDEOS_REQUEST_FAILURE,
    description: 'Fetching videos is failed.',
    error
});

export const remove_profile_info = () => ({ 
    type: types.REMOVE_PROFILE_INFO,
    description: 'Removing profile info.',
});

export const fetch_english_classes_request = () => ({ 
    type: types.FETCH_ENGLISH_CLASSES_REQUEST,
    description: 'Fetching english classes...'
});

export const fetch_english_classes_request_success = (result) => ({ 
    type: types.FETCH_ENGLISH_CLASSES_REQUEST_SUCCESS,
    description: 'Fetching english classes is succeeded.',
    result
});

export const fetch_english_classes_request_failure = (error) => ({ 
    type: types.FETCH_ENGLISH_CLASSES_REQUEST_FAILURE,
    description: 'Fetching english classes is failed.',
    error
});

export const create_english_class_request = () => ({ 
    type: types.CREATE_ENGLISH_CLASS_REQUEST,
    description: 'Creating english class...'
});

export const create_english_class_request_success = (result) => ({ 
    type: types.CREATE_ENGLISH_CLASS_REQUEST_SUCCESS,
    description: 'Creating english class is succeeded.',
    result
});

export const create_english_class_request_failure = (error) => ({ 
    type: types.CREATE_ENGLISH_CLASS_REQUEST_FAILURE,
    description: 'Creating english class is failed.',
    error
});

export const fetch_english_class_by_id_request = () => ({ 
    type: types.FETCH_ENGLISH_CLASS_BY_ID_REQUEST,
    description: 'Fetching english class by id...'
});

export const fetch_english_class_by_id_request_success = (result) => ({ 
    type: types.FETCH_ENGLISH_CLASS_BY_ID_REQUEST_SUCCESS,
    description: 'Fetching english class by id is succeeded.',
    result
});

export const fetch_english_class_by_id_request_failure = (error) => ({ 
    type: types.FETCH_ENGLISH_CLASS_BY_ID_REQUEST_FAILURE,
    description: 'Fetching english class by id is failed.',
    error
});

export const update_english_class_request = () => ({ 
    type: types.UPDATE_ENGLISH_CLASS_REQUEST,
    description: 'Updating english class...'
});

export const update_english_class_request_success = (result) => ({ 
    type: types.UPDATE_ENGLISH_CLASS_REQUEST_SUCCESS,
    description: 'Updating english class is succeeded.',
    result
});

export const update_english_class_request_failure = (error) => ({ 
    type: types.UPDATE_ENGLISH_CLASS_REQUEST_FAILURE,
    description: 'Updating english class is failed.',
    error
});