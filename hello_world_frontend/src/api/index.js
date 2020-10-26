import * as actions from '../actions';

const api_address = 'https://api.halloenglish.com';


export function add_new_resource(resource_name, new_resource) {
  
  return function (dispatch) {

    dispatch(actions.insert_resource_request())

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
        dispatch(actions.insert_resource_success())
        // dispatch(fetch_logs())
      }
    ).catch(error => 
      dispatch(actions.insert_resource_failure(error))
    );
  }
}

export function fetch_menu_list() {
  
  return function (dispatch) {

    dispatch(actions.fetch_menu_list_request())

    return fetch(`${api_address}/`)
      .then(
        response => response.json()
      )
      .then(json => {
        dispatch(actions.fetch_menu_list_success(json))
        // dispatch(fetch_server_status(json))
      }
          
      ).catch(error => 
        dispatch(actions.fetch_menu_list_failure(error))
      );
  }
}

export function fetch_menu_resources(resource_link) {
  
  return function (dispatch) {

    dispatch(actions.fetch_resources_request())

    return fetch(resource_link)
      .then(
        response => response.json()
      )
      .then(json => {
        dispatch(actions.fetch_resources_success(json))
        // dispatch(fetch_server_status(json))
      }
          
      ).catch(error => 
        dispatch(actions.fetch_resources_failure(error))
      );
  }
}

export function fetch_menu_resources_options(resource_link) {
  
  return function (dispatch) {

    dispatch(actions.fetch_menu_resources_options_request())

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
        dispatch(actions.fetch_menu_resources_options_success(json))
      }
          
      ).catch(error => 
        dispatch(actions.fetch_menu_resources_options_failure(error))
      );
  }
}

export function login(email) {
  const post_data = {email};
  return function (dispatch) {
    dispatch(actions.login_request(email))
    return fetch(`${api_address}/auth/email/`, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(post_data)
    })
    .then(
      response => {
        if(response['status'] == 200) {
            response.json().then(json => dispatch(actions.login_request_success(json)));
        }
        else if(response['status'] == 500) {
            dispatch(actions.login_request_success({result: "Server Internal Error"}));
        }
        else{
          response.json().then(json => dispatch(actions.login_request_success(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.login_request_failure(error))
    );
  }
}

export function send_verification_code(email, token) {

  const post_data = {email,token};
  
  return function (dispatch) {

    dispatch(actions.email_verification_request())

    return fetch(`${api_address}/auth/token/`, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(post_data)
    })
    .then(
      response => {
        if(response['status'] == 200) {
          response.json().then(json => dispatch(actions.email_verification_request_success(json)));
        }
        else {
          response.json().then(json => dispatch(actions.email_verification_failure(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.email_verification_failure(error))
    );
  }
}

export function send_profile_info(
  profile_url, user_type, timezone, skype_link, avatar) {

  const post_data = {
    user_type, timezone, skype_link, is_completed: true, avatar};
  
  return function (dispatch, getState) {

    let state = getState();
    const token = state.AuthToken; 
    dispatch(actions.send_profile_info_request())

    return fetch(`${profile_url}`, {
      method: 'PUT',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(post_data)
    })
    .then(
      response => {
        if(response['status'] == 200) {
          response.json().then(json => dispatch(actions.send_profile_info_request_success(json)));
        }
        else {
          response.json().then(json => dispatch(actions.send_profile_info_request_failure(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.send_profile_info_request_failure(error))
    );
  }
}

export function fetch_profile_info() {

  return function (dispatch, getState) {

    let state = getState();
    const menu_list = state.MenuList; 
    const token = state.AuthToken; 

    dispatch(actions.fetch_profile_info_request())

    return fetch(`${api_address}/profile/`, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
    .then(
      response => {
        if(response['status'] == 200) {
          response.json().then(json => dispatch(actions.fetch_profile_info_request_success(json)));
        }
        else {
          response.json().then(json => dispatch(actions.fetch_profile_info_request_failure(json)));
        }
      }
    ).catch(error => {
      dispatch(actions.fetch_profile_info_request_failure(error))
    }
    );
  }
}

export function fetch_profile_avatar(avatar) {

  return function (dispatch, getState) {

    let state = getState();
    const token = state.AuthToken; 

    dispatch(actions.fetch_profile_avatar_request())

    return fetch(`${avatar}`, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
    .then(
      response => {
        if(response['status'] == 200) {
          response.json().then(json => dispatch(actions.fetch_profile_avatar_request_success(json)));
        }
        else {
          response.json().then(json => dispatch(actions.fetch_profile_avatar_request_failure(json)));
        }
      }
    ).catch(error => {
      dispatch(actions.fetch_profile_avatar_request_failure(error))
    }
    );
  }
}

export function fetch_blog_posts() {

  return function (dispatch) {

    dispatch(actions.fetch_blog_posts_request())

    return fetch(`${api_address}/blog_post/`, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
    .then(
      response => {
        if(response['status'] == 200) {
          response.json().then(
            json => dispatch(actions.fetch_blog_posts_request_success(json)));
        }
        else {
          response.json().then(
            json => dispatch(actions.fetch_blog_posts_request_failure(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.fetch_blog_posts_request_failure(error))
    );
  }
}

export function fetch_videos() {

  return function (dispatch) {

    dispatch(actions.fetch_videos_request())

    return fetch(`${api_address}/stream/`, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
    .then(
      response => {
        if(response['status'] == 200) {
          response.json().then(
            json => dispatch(actions.fetch_videos_request_success(json)));
        }
        else {
          response.json().then(
            json => dispatch(actions.fetch_videos_request_failure(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.fetch_videos_request_failure(error))
    );
  }
}