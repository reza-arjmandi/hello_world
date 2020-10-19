import { connect } from 'react-redux';
import Main from '../../../logged_in/components/Main'

import persons from "../../../stories/dummy_data/persons";


const map_state_to_props = state => ({
    persons: persons,
});

const map_dispatch_to_props = dispatch => ({
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(Main);