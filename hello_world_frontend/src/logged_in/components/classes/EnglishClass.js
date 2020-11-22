import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  withStyles,
} from "@material-ui/core";
import UpdateEnglishClass from "./UpdateEnglishClass";

function EnglishClass(props) {
  const {
    fetch_class_by_id,
    selected_english_class,
    selectDashboard,
    // CardChart,
    // statistics,
    toggleAccountActivation,
    pushMessageToSnackbar,
    // targets,
    // setTargets,
    isAccountActivated,
    profile_info,
    update_profile_info,
    theme,
    classes,
    closeAddPostModal,
    Dropzone,
    EmojiTextArea,
    DateTimePicker,
    ImageCropper,
    onClose,
    create_english_class,
    openAddPostModal,
    isAddPostPaperOpen,
    selectClasses,
    update_english_class,
    delete_english_class,
  } = props;

  let { class_id } = useParams();
  useEffect(()=>{
    selectClasses();
    openAddPostModal();
    if(selected_english_class) {
      return;
    }
    fetch_class_by_id(class_id)
  }, [fetch_class_by_id, class_id, selected_english_class]);

  if(!selected_english_class) {
    return <div/>
  }
  
  if(
    isAddPostPaperOpen 
    && selected_english_class['owner'] === profile_info['owner']) {
    return <UpdateEnglishClass 
      onClose={closeAddPostModal}
      EmojiTextArea={EmojiTextArea}
      ImageCropper={ImageCropper}
      Dropzone={Dropzone}
      DateTimePicker={DateTimePicker}
      pushMessageToSnackbar={pushMessageToSnackbar}
      update_english_class={update_english_class}
      openAddPostModal={openAddPostModal}
      selected_english_class={selected_english_class}
      delete_english_class={delete_english_class}
    />
  }
  else{
    return <h2>title2</h2>
  }
  
}

EnglishClass.propTypes = {
  CardChart: PropTypes.elementType,
  statistics: PropTypes.object.isRequired,
  toggleAccountActivation: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTargets: PropTypes.func.isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
  selectDashboard: PropTypes.func.isRequired,
};

export default EnglishClass;
