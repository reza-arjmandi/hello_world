import React, { useState, useCallback, useEffect } from "react";
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
    profile_info,
    create_english_class,
  } = props;
  const [isAddPostPaperOpen, setIsAddPostPaperOpen] = useState(false);

  const openAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(true);
  }, [setIsAddPostPaperOpen]);

  const closeAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(false);
  }, [setIsAddPostPaperOpen]);

  useEffect(() => {
    fetch_english_classes();
    selectClasses();
  }, [selectClasses, fetch_english_classes]);

  if (isAddPostPaperOpen) {
    return <AddClass
      onClose={closeAddPostModal}
      EmojiTextArea={EmojiTextArea}
      ImageCropper={ImageCropper}
      Dropzone={Dropzone}
      DateTimePicker={DateTimePicker}
      pushMessageToSnackbar={pushMessageToSnackbar}
      create_english_class={create_english_class}
    />
  }
  return <ClassContent
    openAddPostModal={openAddPostModal}
    class_contents={class_contents}
    fetch_english_classes={fetch_english_classes}
    pushMessageToSnackbar={pushMessageToSnackbar}
    profile_info={profile_info}
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
