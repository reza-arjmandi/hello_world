import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import UpdateEnglishClass from "./UpdateEnglishClass";
import SubscribeEnglishClass from "./SubscribeEnglishClass";

function EnglishClass(props) {
  const {
    fetch_class_by_id,
    selected_english_class,
    clear_selected_english_class,
    pushMessageToSnackbar,
    profile_info,
    closeAddPostModal,
    Dropzone,
    EmojiTextArea,
    DateTimePicker,
    ImageCropper,
    openAddPostModal,
    isAddPostPaperOpen,
    selectClasses,
    update_english_class,
    delete_english_class,
    subscribe_english_class,
  } = props;

  let { class_id } = useParams();

  useEffect(()=>{
    selectClasses();
    openAddPostModal();
    if(selected_english_class) {
      return;
    }
    fetch_class_by_id(class_id)
  }, [
    selectClasses, 
    openAddPostModal, 
    fetch_class_by_id, 
    class_id, 
    selected_english_class]);

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
    return <SubscribeEnglishClass 
      onClose={closeAddPostModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
      update_english_class={update_english_class}
      selected_english_class={selected_english_class}
      subscribe_english_class={subscribe_english_class}
      clear_selected_english_class={clear_selected_english_class}
    />
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
