import {
    fetch_logs_request,
    fetch_logs_success,
    fetch_logs_failure,
    fetch_server_status_request,
    fetch_server_status_success,
    fetch_server_status_failure,
    insert_resource_request,
    insert_resource_success,
    insert_resource_failure,
    delete_log_request,
    delete_log_success,
    delete_log_failure,
    download_log_file_request,
    download_log_file_success,
    download_log_file_failure,
    start_server_request,
    start_server_success,
    start_server_failure,
    stop_server_request,
    stop_server_success,
    stop_server_failure,
    fetch_menu_list_request,
    fetch_menu_list_failure,
    fetch_menu_list_success,
    fetch_menu_resources_options_request,
    fetch_menu_resources_options_failure,
    fetch_menu_resources_options_success,
    fetch_resources_request,
    fetch_resources_failure,
    fetch_resources_success,
} from '../actions';

import fileDownload from 'js-file-download';

const api_address = 'https://api.halloenglish.com';

export function fetch_logs() {
  
    return function (dispatch) {
  
      dispatch(fetch_logs_request())
  
      return fetch(`${api_address}/serial_ports/`)
        .then(
          response => response.json()
        )
        .then(json => {
          dispatch(fetch_logs_success(json))
          dispatch(fetch_server_status(json))
        }
            
        ).catch(error => 
          dispatch(fetch_logs_failure(error))
        );
    }
}

export function fetch_server_status() {
  
  return function (dispatch) {

    dispatch(fetch_server_status_request())

    return fetch(`${api_address}/instafarm_server/`)
      .then(
        response => response.json()
      )
      .then(
        json => dispatch(fetch_server_status_success(json)
      )
      ).catch(error => 
        dispatch(fetch_server_status_failure(error))
      );
  }
}

export function add_new_resource(resource_name, new_resource) {
  
  return function (dispatch) {

    dispatch(insert_resource_request())

    return fetch(`${api_address}/${resource_name}/`, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(new_resource)
    })
    .then(
      response => response.json()
    )
    .then(
      json => {
        dispatch(insert_resource_success())
        // dispatch(fetch_logs())
      }
    ).catch(error => 
      dispatch(insert_resource_failure(error))
    );
  }
}

export function update_log(device_name, device_info) {
  console.log(JSON.stringify(device_info))
  return function (dispatch) {

    dispatch(insert_resource_request())

    return fetch(`${api_address}/serial_ports/${device_name}/`, {
      method: 'PUT',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(device_info)
    })
    .then(
      response => response.json()
    )
    .then(
      json => {
        dispatch(insert_resource_success())
        dispatch(fetch_logs())
      }
    ).catch(error => 
      dispatch(insert_resource_failure(error))
    );
  }
}

export function delete_log(device_info) {
  return function (dispatch) {

    dispatch(delete_log_request())

    return fetch(`${api_address}/serial_ports/${device_info.device_name}`, {
      method: 'DELETE',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    .then(
      () => {
        dispatch(delete_log_success())
        dispatch(fetch_logs())
      }
    ).catch(error => 
      dispatch(delete_log_failure(error))
    );
  }
}

export function set_server_status(status) {
  return function (dispatch) {
    status['is_started'] 
      ? dispatch(start_server_request()) 
      : dispatch(stop_server_request());

    return fetch(`${api_address}/instafarm_server/`, {
      method: 'PUT',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(status)
    })
    .then(
      response => response.json()
    )
    .then(
      json => {
        status['is_started'] 
        ? dispatch(start_server_success()) 
        : dispatch(stop_server_success());
        dispatch(fetch_server_status())
      }
    ).catch(error => 
      status['is_started'] 
        ? dispatch(start_server_failure(error)) 
        : dispatch(stop_server_failure(error))
    );
  }
}

export function fetch_menu_list() {
  
  return function (dispatch) {

    dispatch(fetch_menu_list_request())

    return fetch(`${api_address}/`)
      .then(
        response => response.json()
      )
      .then(json => {
        dispatch(fetch_menu_list_success(json))
        // dispatch(fetch_server_status(json))
      }
          
      ).catch(error => 
        dispatch(fetch_menu_list_failure(error))
      );
  }
}

export function fetch_menu_resources(resource_link) {
  
  return function (dispatch) {

    dispatch(fetch_resources_request())

    return fetch(resource_link)
      .then(
        response => response.json()
      )
      .then(json => {
        dispatch(fetch_resources_success(json))
        // dispatch(fetch_server_status(json))
      }
          
      ).catch(error => 
        dispatch(fetch_resources_failure(error))
      );
  }
}

export function fetch_menu_resources_options(resource_link) {
  
  return function (dispatch) {

    dispatch(fetch_menu_resources_options_request())

    return fetch(resource_link, {
      method: 'OPTIONS',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then(
        response => response.json()
      )
      .then(json => {
        dispatch(fetch_menu_resources_options_success(json))
      }
          
      ).catch(error => 
        dispatch(fetch_menu_resources_options_failure(error))
      );
  }
}