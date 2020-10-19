import { connect } from 'react-redux';
import Main from '../../../logged_out/components/Main'

import dummyBlogPosts from "../../../stories/dummy_data/blogPosts";

import { fetch_blog_posts } from '../../../api';

import { 
    close_login_dialog,
    clear_login_request_result,
    click_menu,
 } from '../../../actions';

import { 
    login,
    send_verification_code,
    fetch_profile_info,
} from '../../../api';

const map_state_to_props = state => ({
    blog_posts_data: state.BlogPosts,
    login_step: state.LoginStep,
    login_request_result: state.LoginRequestResult,
    login_request_is_fetching: state.LoginRequestIsFetching,
    email: state.Email,
});

const map_dispatch_to_props = dispatch => ({
    fetch_blog_posts: () => dispatch(fetch_blog_posts()),
    login: (email) => { 
        dispatch(login(email));
        dispatch(clear_login_request_result()); },
    send_verification_code: (eamil, token) => {
        dispatch(send_verification_code(eamil, token));
        dispatch(clear_login_request_result());},
    open_profile_menu: () => {
        dispatch(close_login_dialog());
        dispatch(click_menu("profile"));
        dispatch(fetch_profile_info("profile"));
    },
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(Main);