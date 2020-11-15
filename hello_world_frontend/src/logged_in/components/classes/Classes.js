import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import ClassContent from "./ClassContent";
import AddPost from "./AddClass";

function Classes(props) {
  const {
    selectClasses,
    EmojiTextArea,
    ImageCropper,
    Dropzone,
    DateTimePicker,
    pushMessageToSnackbar,
    posts,
    setPosts,
    profile_info,
  } = props;
  const [isAddPostPaperOpen, setIsAddPostPaperOpen] = useState(false);

  const openAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(true);
  }, [setIsAddPostPaperOpen]);

  const closeAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(false);
  }, [setIsAddPostPaperOpen]);

  useEffect(() => {
    selectClasses();
  }, [selectClasses]);

  if (isAddPostPaperOpen) {
    return <AddPost
      onClose={closeAddPostModal}
      EmojiTextArea={EmojiTextArea}
      ImageCropper={ImageCropper}
      Dropzone={Dropzone}
      DateTimePicker={DateTimePicker}
      pushMessageToSnackbar={pushMessageToSnackbar}
    />
  }
  return <ClassContent
    openAddPostModal={openAddPostModal}
    posts={posts}
    setPosts={setPosts}
    pushMessageToSnackbar={pushMessageToSnackbar}
    profile_info={profile_info}
  />
}

Classes.propTypes = {
  EmojiTextArea: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
  Dropzone: PropTypes.elementType,
  DateTimePicker: PropTypes.elementType,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPosts: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
  selectPosts: PropTypes.func.isRequired,
};

export default Classes;
