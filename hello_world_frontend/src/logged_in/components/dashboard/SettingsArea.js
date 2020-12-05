import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Settings1 from "./Settings1";

function SettingsArea(props) {
  const { 
    pushMessageToSnackbar, 
    profile_info,
    update_profile_info,
   } = props;
  return (
    <Fragment>
      <Settings1 
        pushMessageToSnackbar={pushMessageToSnackbar} 
        profile_info={profile_info}
        update_profile_info={update_profile_info}
      />
    </Fragment>
  );
}

SettingsArea.propTypes = {
  pushMessageToSnackbar: PropTypes.func
};

export default SettingsArea;
