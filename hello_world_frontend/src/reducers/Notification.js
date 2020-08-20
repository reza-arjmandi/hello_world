import {
    FETCH_RESOURCES_REQUEST,
    FETCH_RESOURCES_FAILURE,
    FETCH_RESOURCES_SUCCESS,
    FETCH_SERVER_STATUS_REQUEST,
    FETCH_SERVER_STATUS_FAILURE,
    FETCH_SERVER_STATUS_SUCCESS,
    INSERT_RESOURCE_REQUEST,
    INSERT_RESOURCE_FAILURE,
    INSERT_RESOURCE_SUCCESS,
    DELETE_LOG_REQUEST,
    DELETE_LOG_FAILURE,
    DELETE_LOG_SUCCESS,
    DOWNLOAD_LOG_FILE_REQUEST,
    DOWNLOAD_LOG_FILE_FAILURE,
    DOWNLOAD_LOG_FILE_SUCCESS,
    start_server_REQUEST,
    start_server_FAILURE,
    start_server_SUCCESS,
    stop_server_REQUEST,
    stop_server_FAILURE,
    stop_server_SUCCESS,
    FETCH_MENU_LIST_REQUEST,
    FETCH_MENU_LIST_FAILURE,
    FETCH_MENU_LIST_SUCCESS,
    FETCH_MENU_RESOURCES_OPTIONS_REQUEST,
    FETCH_MENU_RESOURCES_OPTIONS_FAILURE,
    FETCH_MENU_RESOURCES_OPTIONS_SUCCESS,
} from '../constants/ActionTypes';

const initial_state = {
    message: '', 
    type:''
};

export default function Notification(state=initial_state, action) {
    switch(action.type) {
        case FETCH_RESOURCES_REQUEST:
        case FETCH_SERVER_STATUS_REQUEST:
        case INSERT_RESOURCE_REQUEST:
        case DELETE_LOG_REQUEST:
        case DOWNLOAD_LOG_FILE_REQUEST:
        case start_server_REQUEST:
        case stop_server_REQUEST:
        case FETCH_MENU_LIST_REQUEST:
        case FETCH_MENU_RESOURCES_OPTIONS_REQUEST:
            return {
                message: action.description, 
                type: 'info'
            };
        case FETCH_RESOURCES_FAILURE:
        case FETCH_SERVER_STATUS_FAILURE:
        case INSERT_RESOURCE_FAILURE:
        case DELETE_LOG_FAILURE:
        case DOWNLOAD_LOG_FILE_FAILURE:
        case start_server_FAILURE:
        case stop_server_FAILURE:
        case FETCH_MENU_LIST_FAILURE:
        case FETCH_MENU_RESOURCES_OPTIONS_FAILURE:
            return {
                message: `${action.description} ${action.error}`, 
                type: 'error'
            };
        case FETCH_RESOURCES_SUCCESS:
        case FETCH_SERVER_STATUS_SUCCESS:
        case INSERT_RESOURCE_SUCCESS:
        case DELETE_LOG_SUCCESS:
        case DOWNLOAD_LOG_FILE_SUCCESS:
        case start_server_SUCCESS:
        case stop_server_SUCCESS:
        case FETCH_MENU_LIST_SUCCESS:
        case FETCH_MENU_RESOURCES_OPTIONS_SUCCESS:
            return {
                message: action.description, 
                type:'success'
            };
        default:
            return state;
    }
};