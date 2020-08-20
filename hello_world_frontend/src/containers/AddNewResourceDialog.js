import { connect } from 'react-redux';
import AddNewResourceDialog from "../components/AddNewResourceDialog";
import { close_add_new_resource_dialog } from '../actions';
import { add_new_resource } from '../api';

const map_state_to_props = state => ({
    open: state.AddNewResourceDialogVisibility,
    post_options: state.PostOptions,
    resource_name: state.MenuTitle,
});

const map_dispatch_to_props = dispatch => ({
    on_close: () => { dispatch(close_add_new_resource_dialog()) },
    add_new_resource: (resource_name, new_resource) =>  {
            dispatch(add_new_resource(resource_name, new_resource))
        }
});

export default connect(
    map_state_to_props, 
    map_dispatch_to_props
)(AddNewResourceDialog);