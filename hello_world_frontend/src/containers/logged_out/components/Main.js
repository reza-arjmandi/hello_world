import { connect } from 'react-redux';
import Main from '../../../logged_out/components/Main'

import dummyBlogPosts from "../../../stories/dummy_data/blogPosts";

import { fetch_blog_posts } from '../../../api';

const map_state_to_props = state => ({
    blog_posts_data: state.BlogPosts,
});

const map_dispatch_to_props = dispatch => ({
    fetch_blog_posts: () => dispatch(fetch_blog_posts()),
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(Main);