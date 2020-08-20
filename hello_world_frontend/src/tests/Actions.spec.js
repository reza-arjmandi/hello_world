import * as types from '../constants/ActionTypes';
import * as actions from '../actions';

describe('serial port logger actions', () => {
    
    it('open_add_new_resource_dialog should create OPEN_ADD_NEW_RESOURCE_DIALOG action', 
    () => {
        expect(actions.open_add_new_resource_dialog()).toEqual({
            type: types.OPEN_ADD_NEW_RESOURCE_DIALOG
        });
    })

    it('close_add_new_resource_dialog should create CLOSE_ADD_NEW_RESOURCE_DIALOG action'
    , () => {
        expect(actions.close_add_new_resource_dialog()).toEqual({
            type: types.CLOSE_ADD_NEW_RESOURCE_DIALOG
        });
    })

    it('fetch_logs_request should create FETCH_RESOURCES_REQUEST action', () => {
        expect(actions.fetch_logs_request()).toEqual({
            type: types.FETCH_RESOURCES_REQUEST,
            description: 'Fetching logs...'
        });
    })

    it('fetch_logs_failure should create FETCH_RESOURCES_FAILURE action', () => {
        expect(actions.fetch_logs_failure("this is a err")).toEqual({
            type: types.FETCH_RESOURCES_FAILURE,
            description: 'Fetching of logs failed.',
            error: "this is a err"
        });
    })

    it('fetch_logs_success should create FETCH_RESOURCES_SUCCESS action', () => {
        expect(actions.fetch_logs_success("this is a response")).toEqual({
            type: types.FETCH_RESOURCES_SUCCESS,
            description: 'Fetching of logs succeeded.',
            response: "this is a response"
        });
    })

    it('fetch_server_status_request should \
create FETCH_SERVER_STATUS_REQUEST', 
    () => {
        expect(actions.fetch_server_status_request()).toEqual({
            type: types.FETCH_SERVER_STATUS_REQUEST,
            description: 'Fetching server status...'
        });
    })

    it('fetch_server_status_failure should careate \
FETCH_SERVER_STATUS_FAILURE', () => {
        expect(actions.fetch_server_status_failure('this is err')).toEqual({
            type:types.FETCH_SERVER_STATUS_FAILURE,
            description: 'Fetching of server status failed.',
            error: 'this is err'
        })
    })

    it('fetch_server_status_success should careate \
FETCH_SERVER_STATUS_SUCCESS', () => {
        expect(actions.fetch_server_status_success({
             is_started: true })).toEqual({
            type: types.FETCH_SERVER_STATUS_SUCCESS,
            description: 'Fetching of server status succeeded.',
            is_started: true
        });

        expect(actions.fetch_server_status_success({
            is_started: false })).toEqual({
            type: types.FETCH_SERVER_STATUS_SUCCESS,
            description: 'Fetching of server status succeeded.',
            is_started: false
        });
    })

    it('insert_resource_request should create \
INSERT_RESOURCE_REQUEST', () => {
        expect(actions.insert_resource_request()).toEqual({
            type: types.INSERT_RESOURCE_REQUEST,
            description: 'Inserting a resource...'
        });
    });

    it('insert_resource_success should create \
INSERT_RESOURCE_SUCCESS', () => {
        expect(actions.insert_resource_success()).toEqual({
            type: types.INSERT_RESOURCE_SUCCESS,
            description: 'Inserting the resource succeeded.'
        });
    });

    it('insert_resource_failure should create \
INSERT_RESOURCE_FAILURE', () => {
        expect(actions.insert_resource_failure('this is err')).toEqual({
            type: types.INSERT_RESOURCE_FAILURE,
            description: 'Inserting the log failed.',
            error: 'this is err'
        });
    });

    it('delete_log_request should create DELETE_LOG_REQUEST', 
    () => {
        expect(actions.delete_log_request()).toEqual({
            type: types.DELETE_LOG_REQUEST,
            description: 'Deleting a log...'
        });
    })

    it('delete_log_success should create DELETE_LOG_SUCCESS', () => {
        expect(actions.delete_log_success()).toEqual({
            type: types.DELETE_LOG_SUCCESS,
            description: 'Deleting of the log succeeded.'
        });
    })

    it('delete_log_failure should create DELETE_LOG_FAILURE', () => {
        expect(actions.delete_log_failure('this is err')).toEqual({
            type: types.DELETE_LOG_FAILURE,
            description: 'Deleting of the log failed.',
            error: 'this is err'
        });
    })

    it('download_log_file_request should create DOWNLOAD_LOG_FILE_REQUEST', 
    () => {
        expect(actions.download_log_file_request()).toEqual({
            type: types.DOWNLOAD_LOG_FILE_REQUEST,
            description: 'downloading the log file...'
        });
    })

    it('download_log_file_success should create DOWNLOAD_LOG_FILE_SUCCESS', () => {
        expect(actions.download_log_file_success()).toEqual({
            type: types.DOWNLOAD_LOG_FILE_SUCCESS,
            description: 'Downloading of the log file succeeded.'
        });
    })

    it('download_log_file_failure should create DOWNLOAD_LOG_FILE_FAILURE', () => {
        expect(actions.download_log_file_failure('this is err')).toEqual({
            type: types.DOWNLOAD_LOG_FILE_FAILURE,
            description: 'Downloading of the log file failed.',
            error: 'this is err'
        });
    })

    it('start_server_request should create start_server_REQUEST', 
    () => {
        expect(actions.start_server_request()).toEqual({
            type: types.start_server_REQUEST,
            description: 'start server...'
        });
    })

    it('start_server_success should create start_server_SUCCESS', 
    () => {
        expect(actions.start_server_success()).toEqual({
            type: types.start_server_SUCCESS,
            description: 'starting of server succeeded.'
        });
    })

    it('start_server_failure should create start_server_FAILURE', 
    () => {
        expect(actions.start_server_failure('this is err')).toEqual({
            type: types.start_server_FAILURE,
            description: 'starting of server failed.',
            error: 'this is err'
        });
    })

    it('stop_server_request should create stop_server_REQUEST', 
    () => {
        expect(actions.stop_server_request()).toEqual({
            type: types.stop_server_REQUEST,
            description: 'stop server...'
        });
    })

    it('stop_server_success should create stop_server_SUCCESS', 
    () => {
        expect(actions.stop_server_success()).toEqual({
            type: types.stop_server_SUCCESS,
            description: 'stoping of server succeeded.'
        });
    })

    it('stop_server_failure should create stop_server_FAILURE', 
    () => {
        expect(actions.stop_server_failure('this is err')).toEqual({
            type: types.stop_server_FAILURE,
            description: 'stoping of server failed.',
            error: 'this is err'
        });
    })
});