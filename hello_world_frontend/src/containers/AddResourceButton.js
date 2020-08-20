import { connect } from 'react-redux';
import AddResourceButton from "../components/AddResourceButton";
import { open_add_new_resource_dialog } from "../actions";

const map_state_to_props = state => ({
    resource_name: state.MenuTitle,
    is_enable_add_resource: state.IsEnableAddResource,
});

const map_dispatch_to_props = dispatch => ({
    onAddResource: () => { dispatch(open_add_new_resource_dialog()) },
});

export default connect(
    map_state_to_props,
    map_dispatch_to_props
)(AddResourceButton);