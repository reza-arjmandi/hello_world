import { connect } from 'react-redux';
import Main from '../../../logged_out/components/Main'

import { 
    fetch_blog_posts, 
    fetch_menu_resources ,
    fetch_videos,
    login,
    send_verification_code,
    fetch_profile_info,
} from '../../../api';

import { 
    clear_login_request_result,
    change_page_number,
 } from '../../../actions';

const map_state_to_props = state => ({
    blog_posts_data: state.BlogPosts,
    login_step: state.LoginStep,
    login_request_result: state.LoginRequestResult,
    login_request_is_fetching: state.LoginRequestIsFetching,
    email: state.Email,
    videos: state.Videos,
    page_number: state.PageNumber,
    is_login: state.IsLogin,
});

const map_dispatch_to_props = dispatch => ({
    fetch_blog_posts: () => dispatch(fetch_blog_posts()),
    fetch_videos: () => dispatch(fetch_videos()),
    login: (email) => { 
        dispatch(login(email));
        dispatch(clear_login_request_result()); },
    send_verification_code: (eamil, token) => {
        dispatch(send_verification_code(eamil, token));
        dispatch(clear_login_request_result());},
    open_profile_menu: () => {
        dispatch(fetch_profile_info());
    },
    change_page: (number, resource_link) => {
        dispatch(change_page_number(number));
        dispatch(fetch_menu_resources(resource_link));
    },
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(Main);