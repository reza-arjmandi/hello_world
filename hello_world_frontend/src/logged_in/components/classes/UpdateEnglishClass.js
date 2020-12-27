import React, { Fragment, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import ActionPaper from "../../../shared/components/ActionPaper";
import ButtonCircularProgress from 
  "../../../shared/components/ButtonCircularProgress";
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
    selected_english_class,
    onClose,
    clear_selected_english_class,
    history,
  } = props;

  const [is_delete_class_dialog_open, set_is_delete_class_dialog_open] = 
    useState(false);
  const [is_delete_class_dialog_loading, set_is_delete_class_dialog_loading] = useState(
    false
  );

  const close_delete_class_dialog = useCallback(() => {
    set_is_delete_class_dialog_open(false);
    set_is_delete_class_dialog_loading(false);
  }, [set_is_delete_class_dialog_open, set_is_delete_class_dialog_loading]);

  const delete_class = useCallback(() => {
    delete_english_class(selected_english_class["url"]);
    history.push("/c/classes");
    clear_selected_english_class();
    onClose();
  }, [
    delete_english_class,
    selected_english_class,
    history,
    onClose,
  ]);
  
  const on_back = useCallback(() => {
    history.push("/c/classes");
    clear_selected_english_class();
    onClose();
  }, [history, onClose]);

  const on_delete = useCallback(() => {
    set_is_delete_class_dialog_open(true);
  }, [set_is_delete_class_dialog_open])

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cropperFile, setCropperFile] = useState(null);

  const [title, set_title] = useState(selected_english_class["title"]);
  const [skype_link, set_skype_link] = useState(selected_english_class["skype_link"]);
  const [capacity, set_capacity] = useState(selected_english_class["capacity"]);
  const [description, set_description] = useState(selected_english_class["description"]);
  const [date_time, set_date_time] = useState(new Date(selected_english_class["date_time"]));
  const [current_image, set_current_image] = useState(selected_english_class["image"]);
  
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
    set_current_image(null);
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

  const handleUpdate = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      pushMessageToSnackbar({
        text: "Your post has been updated",
      });
      const updated_data = {"title": title,
       "description": description,
       "date_time": date_time.toISOString(),
       "skype_link": skype_link,
       "capacity": capacity
      };
      if(files[0]) {
        updated_data["image"] = files[0]
      }
      update_english_class(selected_english_class["url"], updated_data);
      on_back();
    }, 1500);
  }, [setLoading, 
    pushMessageToSnackbar, 
    title, 
    description, 
    date_time, 
    skype_link, 
    on_back, 
    selected_english_class, 
    update_english_class, 
    capacity, 
    files]);

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
            current_image={current_image}
          />
        }
        actions={
          <Fragment>
              <Box mr={1}>
              <Button onClick={on_back} disabled={loading}>
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
              disabled={loading}
            >
              Update {loading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
      <ConfirmationDialog
        open={is_delete_class_dialog_open}
        title="Confirmation"
        content="Do you really want to delete the english class?"
        onClose={close_delete_class_dialog}
        loading={is_delete_class_dialog_loading}
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
