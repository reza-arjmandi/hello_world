import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ClassContent from "./ClassContent";
import AddClass from "./AddClass";

function Classes(props) {
  const {
    selectClasses,
    EmojiTextArea,
    ImageCropper,
    Dropzone,
    DateTimePicker,
    pushMessageToSnackbar,
    class_contents,
    fetch_english_classes,
    fetch_english_classes_by_page_number,
    profile_info,
    create_english_class,
    isAddPostPaperOpen,
    closeAddPostModal,
    openAddPostModal,
    english_classes_page,
    set_english_classes_page,
  } = props;

  useEffect(() => {
    fetch_english_classes_by_page_number(english_classes_page);
    selectClasses();
  }, [
    selectClasses, 
    fetch_english_classes, 
    class_contents, 
    fetch_english_classes_by_page_number,
    english_classes_page]);

  if (isAddPostPaperOpen) {
    return <AddClass
      onClose={closeAddPostModal}
      EmojiTextArea={EmojiTextArea}
      ImageCropper={ImageCropper}
      Dropzone={Dropzone}
      DateTimePicker={DateTimePicker}
      pushMessageToSnackbar={pushMessageToSnackbar}
      create_english_class={create_english_class}
      fetch_english_classes={fetch_english_classes}
    />
  }
  return <ClassContent
    openAddPostModal={openAddPostModal}
    class_contents={class_contents}
    fetch_english_classes={fetch_english_classes}
    pushMessageToSnackbar={pushMessageToSnackbar}
    profile_info={profile_info}
    english_classes_page={english_classes_page}
    set_english_classes_page={set_english_classes_page}
  />
}

Classes.propTypes = {
  EmojiTextArea: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
  Dropzone: PropTypes.elementType,
  DateTimePicker: PropTypes.elementType,
  class_contents: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetch_english_classes: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
  selectPosts: PropTypes.func.isRequired,
};

export default Classes;
