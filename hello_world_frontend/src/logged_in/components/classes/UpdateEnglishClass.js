import React, { Fragment, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ActionPaper from "../../../shared/components/ActionPaper";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import AddClassOptions from "./AddClassOptions";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";

function UpdateEnglishClass(props) {
  const {
    pushMessageToSnackbar,
    Dropzone,
    EmojiTextArea,
    DateTimePicker,
    ImageCropper,
    update_english_class,
    delete_english_class,
    openAddPostModal,
    selected_english_class,
    onClose,
    history,
  } = props;

  const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState(false);
  const [isDeletePostDialogLoading, setIsDeletePostDialogLoading] = useState(
    false
  );

  const closeDeletePostDialog = useCallback(() => {
    setIsDeletePostDialogOpen(false);
    setIsDeletePostDialogLoading(false);
  }, [setIsDeletePostDialogOpen, setIsDeletePostDialogLoading]);

  const delete_class = useCallback(() => {
    delete_english_class(selected_english_class["url"]);
    history.push("/c/classes");
    onClose();
  }, [
    delete_english_class,
    selected_english_class,
    history,
    onClose,
  ]);
  
  const onBack = () => {
    history.push("/c/classes");
    onClose();
  }

  const on_delete = () => {
    setIsDeletePostDialogOpen(true);
  }

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cropperFile, setCropperFile] = useState(null);

  const [title, set_title] = useState("");
  const [skype_link, set_skype_link] = useState("");
  const [capacity, set_capacity] = useState("");
  const [description, set_description] = useState("");
  const [date_time, set_date_time] = useState(new Date());
  
  const acceptDrop = useCallback(
    (file) => {
      setFiles([file]);
    },
    [setFiles]
  );

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length + rejectedFiles.length > 1) {
        pushMessageToSnackbar({
          isErrorMessage: true,
          text: "You cannot upload more than one file at once",
        });
      } else if (acceptedFiles.length === 0) {
        pushMessageToSnackbar({
          isErrorMessage: true,
          text: "The file you wanted to upload isn't an image",
        });
      } else if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];
        file.preview = URL.createObjectURL(file);
        file.key = new Date().getTime();
        setCropperFile(file);
      }
    },
    [pushMessageToSnackbar, setCropperFile]
  );

  const onCropperClose = useCallback(() => {
    setCropperFile(null);
  }, [setCropperFile]);

  const deleteItem = useCallback(() => {
    setCropperFile(null);
    setFiles([]);
  }, [setCropperFile, setFiles]);

  const onCrop = useCallback(
    (dataUrl) => {
      const file = { ...cropperFile };
      file.preview = dataUrl;
      acceptDrop(file);
      setCropperFile(null);
    },
    [acceptDrop, cropperFile, setCropperFile]
  );

  useEffect(() => {
    set_description(selected_english_class["description"])
    onCrop(selected_english_class["image"]);
    set_title(selected_english_class["title"])
    set_skype_link(selected_english_class["skype_link"])
    set_capacity(selected_english_class["capacity"])
    set_date_time(new Date(selected_english_class["date_time"]))
},
  [setFiles, selected_english_class, set_title, set_skype_link, set_description, set_date_time]);

  const handleUpdate = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      pushMessageToSnackbar({
        text: "Your post has been updated",
      });
      update_english_class(
        selected_english_class["url"],
        {"title": title,
         "description": description,
         "date_time": date_time.toISOString(),
         "skype_link": skype_link,
        //  "image": files[0],
         "capacity": 2
        }
      )
      onBack();
    }, 1500);
  }, [setLoading, onClose, pushMessageToSnackbar, 
    title, description, date_time, skype_link, files]);

  return (
    <Fragment>
      <ActionPaper
        helpPadding
        maxWidth="md"
        content={
          <AddClassOptions
            EmojiTextArea={EmojiTextArea}
            Dropzone={Dropzone}
            files={files}
            onDrop={onDrop}
            deleteItem={deleteItem}
            DateTimePicker={DateTimePicker}
            onCrop={onCrop}
            ImageCropper={ImageCropper}
            cropperFile={cropperFile}
            onCropperClose={onCropperClose}
            title={title}
            set_title={set_title}
            skype_link={skype_link}
            set_skype_link={set_skype_link}
            capacity={capacity}
            set_capacity={set_capacity}
            description={description}
            set_description={set_description}
            date_time={date_time}
            set_date_time={set_date_time}
          />
        }
        actions={
          <Fragment>
              <Box mr={1}>
              <Button onClick={onBack} disabled={loading}>
                Back
              </Button>
            </Box>
            <Box mr={1}>
              <Button 
              color="primary"
              variant="contained"
              onClick={on_delete} 
              disabled={loading}>
                Delete
              </Button>
            </Box>
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="secondary"
              disabled={files.length === 0 || loading}
            >
              Update {loading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
      <ConfirmationDialog
        open={isDeletePostDialogOpen}
        title="Confirmation"
        content="Do you really want to delete the english class?"
        onClose={closeDeletePostDialog}
        loading={isDeletePostDialogLoading}
        onConfirm={delete_class}
      />
    </Fragment>
  );
}

UpdateEnglishClass.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
  Dropzone: PropTypes.elementType,
  EmojiTextArea: PropTypes.elementType,
  DateTimePicker: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
};

export default withRouter(UpdateEnglishClass);
