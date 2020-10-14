import { connect } from 'react-redux';
import Main from '../../../logged_out/components/Main'

import dummyBlogPosts from "../../../stories/dummy_data/blogPosts";

const map_state_to_props = state => ({
    blog_posts_data: dummyBlogPosts,
});

const map_dispatch_to_props = dispatch => ({
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(Main);