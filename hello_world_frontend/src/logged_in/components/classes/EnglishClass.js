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
    close_update_class_page,
    Dropzone,
    EmojiTextArea,
    DateTimePicker,
    ImageCropper,
    open_update_class_page,
    is_update_class_page_open,
    selectClasses,
    update_english_class,
    delete_english_class,
    subscribe_english_class,
  } = props;

  let { class_id } = useParams();

  useEffect(()=>{
    selectClasses();
    open_update_class_page();
    if(selected_english_class) {
      return;
    }
    fetch_class_by_id(class_id)
  }, [
    selectClasses, 
    open_update_class_page, 
    fetch_class_by_id, 
    class_id, 
    selected_english_class]);

  if(!selected_english_class) {
    return <div/>
  }
  
  if(
    is_update_class_page_open 
    && selected_english_class['owner'] === profile_info['owner']) {
    return <UpdateEnglishClass 
      onClose={close_update_class_page}
      EmojiTextArea={EmojiTextArea}
      ImageCropper={ImageCropper}
      Dropzone={Dropzone}
      DateTimePicker={DateTimePicker}
      pushMessageToSnackbar={pushMessageToSnackbar}
      update_english_class={update_english_class}
      selected_english_class={selected_english_class}
      delete_english_class={delete_english_class}
      clear_selected_english_class={clear_selected_english_class}
    />
  }
  else{
    return <SubscribeEnglishClass 
      onClose={close_update_class_page}
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
