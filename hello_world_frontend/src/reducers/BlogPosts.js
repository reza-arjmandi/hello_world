import { 
    FETCH_BLOG_POSTS_REQUEST_FAILURE,
    FETCH_BLOG_POSTS_REQUEST_SUCCESS,
} from '../constants/ActionTypes';

export default function BlogPosts(state=[], action) {
    switch(action.type) {
        case FETCH_BLOG_POSTS_REQUEST_SUCCESS:
            const blogPosts = action.result['results'].map((blogPost) => {
                let title = blogPost.title;
                title = title.toLowerCase();
                /* Remove unwanted characters, only accept alphanumeric and space */
                title = title.replace(/[^A-Za-z0-9 ]/g, "");
                /* Replace multi spaces with a single space */
                title = title.replace(/\s{2,}/g, " ");
                /* Replace space with a '-' symbol */
                title = title.replace(/\s/g, "-");
                blogPost.url = `/blog/post/${title}`;
                blogPost.params = `?id=${blogPost.id}`;
                return blogPost;
                
              });
            console.log(blogPosts);
            return blogPosts;
        case FETCH_BLOG_POSTS_REQUEST_FAILURE:
        default:
            return state;
    }
};
