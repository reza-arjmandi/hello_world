import { connect } from 'react-redux';
import ButtonAppBar from '../components/ButtonAppBar';
import { set_server_status } from '../api'

const map_state_to_props = state => ({
    is_fetching: state.IsFetchingRecordingStatus,
    is_server_started: state.IsRecordingStarted
});

const map_dispatch_to_props = dispatch => ({
    start_server: () => dispatch(set_server_status({ is_started: true })),
    stop_server: () => dispatch(set_server_status({ is_started: false })),
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(ButtonAppBar);