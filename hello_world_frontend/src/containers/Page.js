import { connect } from 'react-redux';
import Page from '../components/Page';
import {
    update_log,
    delete_log,
    fetch_menu_resources,
} from '../api';

import {change_page_number} from '../actions';

const map_state_to_props = state => ({
    is_fetching: state.IsFetchingResources,
    page_name: state.MenuTitle, 
    post_options: state.PostOptions,
    page_data: state.PageData,
    page_number: state.PageNumber,
});

const map_dispatch_to_props = dispatch => ({
    update_resource: (device_name, log) => dispatch(update_log(device_name, log)),
    delete_resource: (device) => dispatch(delete_log(device)),
    change_page: (number, resource_link) => {
        dispatch(change_page_number(number));
        dispatch(fetch_menu_resources(resource_link));
    },
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(Page);