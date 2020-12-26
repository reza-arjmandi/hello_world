import * as actions from '../actions';

const api_address = 'https://api.halloenglish.com';

export function data_uri_to_blob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
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
      }
          
      ).catch(error => 
        dispatch(actions.fetch_resources_failure(error))
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
        if(response['status'] === 200) {
            response.json().then(json => dispatch(actions.login_request_success(json)));
        }
        else if(response['status'] === 500) {
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
        if(response['status'] === 201) {
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
    user_type, timezone, skype_link, is_completed: true};
  
  return function (dispatch, getState) {

    let state = getState();
    const token = state.AuthToken; 
    dispatch(actions.send_profile_info_request())

    return fetch(`${profile_url}`, {
      method: 'PATCH',
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
        if(response['status'] === 200) {
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
        if(response['status'] === 200) {
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
        if(response['status'] === 200) {
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
        if(response['status'] === 200) {
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
        if(response['status'] === 200) {
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

export function fetch_english_classes(url = null) {

  return function (dispatch) {

    dispatch(actions.fetch_english_classes_request())

    const _url = url===null ? `${api_address}/english_class/` : url;

    return fetch(_url, {
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
        if(response['status'] === 200) {
          response.json().then(
            json => dispatch(actions.fetch_english_classes_request_success(json)));
        }
        else {
          response.json().then(
            json => dispatch(actions.fetch_english_classes_request_failure(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.fetch_english_classes_request_failure(error))
    );
  }
}

export function fetch_english_classes_by_page_number(page_number = 0) {

  return function (dispatch) {

    dispatch(actions.fetch_english_classes_request())

    const _url = `${api_address}/english_class/?page=${page_number+1}` ;

    return fetch(_url, {
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
        if(response['status'] === 200) {
          response.json().then(
            json => dispatch(actions.fetch_english_classes_request_success(json)));
        }
        else {
          response.json().then(
            json => dispatch(actions.fetch_english_classes_request_failure(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.fetch_english_classes_request_failure(error))
    );
  }
}

export function create_english_class(english_class) {

  return function (dispatch, getState) {

    dispatch(actions.create_english_class_request())

    var form_data = new FormData();

    for ( var key in english_class ) {
      if(key==="image") {
        form_data.append("image", data_uri_to_blob(english_class[key]["preview"]), english_class[key]["path"] );
      }
      else {
        form_data.append(key, english_class[key]);
      }
    }

    let state = getState();
    const token = state.AuthToken; 

    return fetch(`${api_address}/english_class/`, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Authorization': `Token ${token}`
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: form_data
    })
    .then(
      response => {
        if(response['status'] === 200) {
          response.json().then(
            json => dispatch(actions.create_english_class_request_success(json)));
        }
        else {
          response.json().then(
            json => dispatch(actions.create_english_class_request_failure(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.create_english_class_request_failure(error))
    );
  }
}

export function fetch_class_by_id(class_id) {

  return function (dispatch) {

    dispatch(actions.fetch_english_class_by_id_request())

    return fetch(`${api_address}/english_class/${class_id}`, {
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
        if(response['status'] === 200) {
          response.json().then(
            json => dispatch(actions.fetch_english_class_by_id_request_success(json)));
        }
        else {
          response.json().then(
            json => dispatch(actions.fetch_english_class_by_id_request_failure(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.fetch_english_class_by_id_request_failure(error))
    );
  }
}

export function update_english_class(url, english_class) {

  return function (dispatch, getState) {

    let state = getState();
    const token = state.AuthToken; 
    dispatch(actions.update_english_class_request())

    var form_data = new FormData();

    for ( var key in english_class ) {
      if(key==="image") {
        form_data.append("image", data_uri_to_blob(english_class[key]["preview"]), english_class[key]["path"] );
      }
      else {
        form_data.append(key, english_class[key]);
      }
    }

    return fetch(url, {
      method: 'PATCH',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Authorization': `Token ${token}`
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: form_data
    })
    .then(
      response => {
        if(response['status'] === 200) {
          response.json().then(json => dispatch(actions.update_english_class_request_success(json)));
        }
        else {
          response.json().then(json => dispatch(actions.update_english_class_request_failure(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.update_english_class_request_failure(error))
    );
  }
}

export function delete_english_class(url) {

  return function (dispatch, getState) {

    let state = getState();
    const token = state.AuthToken; 
    dispatch(actions.delete_english_class_request())

    return fetch(url, {
      method: 'DELETE',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Authorization': `Token ${token}`
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    .then(
      response => {
        if(response['status'] === 204) {
          response.json().then(json => dispatch(actions.delete_english_class_request_success(json)));
        }
        else {
          response.json().then(json => dispatch(actions.delete_english_class_request_failure(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.delete_english_class_request_failure(error))
    );
  }
}

export function subscribe_english_class(url) {

  return function (dispatch, getState) {

    let state = getState();
    const token = state.AuthToken; 
    const profile_url = state.ProfileInfo['url']; 
    dispatch(actions.subscribe_english_class_request())
    const post_data = {profile_info : profile_url, english_class: url};

    return fetch(`${api_address}/membership/`, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(post_data)
    })
    .then(
      response => {
        if(response['status'] === 200) {
          response.json().then(json => dispatch(actions.subscribe_english_class_request_success(json)));
        }
        else {
          response.json().then(json => dispatch(actions.subscribe_english_class_request_failure(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.subscribe_english_class_request_failure(error))
    );
  }
}

export function fetch_subscriptions(url = null) {

  return function (dispatch, getState) {
    let state = getState();
    const owner = state.ProfileInfo.owner; 
    dispatch(actions.fetch_subscriptions_request())

    const _url = url===null ? `${api_address}/english_class/?owner=${owner}` : url;

    return fetch(_url, {
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
        if(response['status'] === 200) {
          response.json().then(
            json => dispatch(actions.fetch_subscriptions_request_success(json)));
        }
        else {
          response.json().then(
            json => dispatch(actions.fetch_subscriptions_request_failure(json)));
        }
      }
    ).catch(error => 
      dispatch(actions.fetch_subscriptions_request_failure(error))
    );
  }
}