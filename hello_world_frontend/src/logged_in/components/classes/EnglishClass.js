import React, { Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  TextField,
  Box,
  withStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Bordered from "../../../shared/components/Bordered";
import ImageCropperDialog from "../../../shared/components/ImageCropperDialog";

const styles = (theme) => ({
  floatButtonWrapper: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1000,
  },
  inputRoot: {
    width: 190,
    "@media (max-width:  400px)": {
      width: 160,
    },
    "@media (max-width:  360px)": {
      width: 140,
    },
    "@media (max-width:  340px)": {
      width: 120,
    },
  },
  uploadIcon: {
    fontSize: 48,
    transition: theme.transitions.create(["color", "box-shadow", "border"], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  imgWrapper: { position: "relative" },
  img: {
    width: "100%",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  uploadText: {
    transition: theme.transitions.create(["color", "box-shadow", "border"], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  numberInput: {
    width: 110,
  },
  numberInputInput: {
    padding: "9px 34px 9px 14.5px",
  },
  emojiTextArea: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: -1,
  },
  dNone: {
    display: "none",
  },
});

function EnglishClass(props) {
  // const {
  //   class_id,
  //   Dropzone,
  //   classes,
  //   files,
  //   deleteItem,
  //   onDrop,
  //   EmojiTextArea,
  //   ImageCropper,
  //   DateTimePicker,
  //   cropperFile,
  //   onCrop,
  //   onCropperClose,
  //   title,
  //   set_title,
  //   skype_link,
  //   set_skype_link,
  //   capacity,
  //   set_capacity,
  //   description,
  //   set_description,
  //   date_time,
  //   set_date_time,
  // } = props;

  console.log("88888888888888888888888888888888888888888888888888")
  return (
    <div>
      <h2>
        Hello World
      </h2>
    </div>
  );
//   const handleChange = useCallback(
//     (event) => {
//       const { name, value } = event.target;
//       switch (name) {
//         case "title":
//           set_title(value);
//           break;
//         case "skype_link":
//           set_skype_link(value);
//           break;
//         case "capacity":
//           set_capacity(value);
//           break;
//         default:
//           throw new Error("No branch selected in switch-statement.");
//       }
//     },
//     [set_title, set_skype_link, set_capacity]
//   );

//   const handleChangeDescription = useCallback(
//     (value) => {
//       set_description(value);
//     },
//     [set_description]
//   );

//   const handle_change_date_time = useCallback(
//     (value) => {
//       set_date_time(value);
//     },
//     [set_date_time]
//   );

//   const printFile = useCallback(() => {
//     if (files[0]) {
//       return (
//         <div className={classes.imgWrapper}>
//           <img
//             alt="uploaded item"
//             src={files[0].preview}
//             className={classes.img}
//             style={{ height: 148 }}
//           />
//           <div className={classes.floatButtonWrapper}>
//             <IconButton onClick={deleteItem}>
//               <CloseIcon />
//             </IconButton>
//           </div>
//         </div>
//       );
//     }
//     return (
//       <Dropzone accept="image/png, image/jpeg" onDrop={onDrop} fullHeight>
//         <span className={classes.uploadText}>
//           Click / Drop file <br /> here
//         </span>
//       </Dropzone>
//     );
//   }, [onDrop, files, classes, deleteItem]);

//   const inputs = useCallback(
//     [
//       {
//         state: title,
//         label: "Title",
//         stateName: "title",
//       },
//       {
//         state: skype_link,
//         label: "Skype link",
//         stateName: "skype_link",
//       },
//       {
//         state: capacity,
//         label: "Capacity",
//         stateName: "capacity",
//       },
//     ],
//     [title, skype_link, capacity]
//   );

//   return (
//     <Fragment>
//       {ImageCropper && (
//         <ImageCropperDialog
//           open={cropperFile ? true : false}
//           ImageCropper={ImageCropper}
//           src={cropperFile ? cropperFile.preview : ""}
//           onCrop={onCrop}
//           onClose={onCropperClose}
//           aspectRatio={4 / 3}
//         />
//       )}
//       <Typography paragraph variant="h6">
//         Upload Image
//       </Typography>
//       <Box mb={2}>
//         {EmojiTextArea && (
//           <EmojiTextArea
//             inputClassName={classes.emojiTextArea}
//             maxCharacters={2200}
//             rightContent={printFile()}
//             emojiSet="google"
//             onChange={handleChangeDescription}  
//             name="description"
//             value={description}
//           />
//         )}
//       </Box>
//       <Typography paragraph variant="h6">
//         Options
//       </Typography>
//       <List disablePadding>
//         <Bordered disableVerticalPadding disableBorderRadius>
//           <ListItem divider disableGutters className="listItemLeftPadding">
//             <ListItemText>
//               <Typography variant="body2">Date time</Typography>
//             </ListItemText>
//             <ListItemSecondaryAction>
//               {DateTimePicker && (
//                 <DateTimePicker
//                   value={date_time}
//                   format="yyyy-MM-dd hh:mm a"
//                   onChange={handle_change_date_time}
//                   disablePast
//                 />
//               )}
//             </ListItemSecondaryAction>
//           </ListItem>
//           {inputs.map((element, index) => (
//             <ListItem
//               className="listItemLeftPadding"
//               disableGutters
//               divider={index !== inputs.length - 1}
//               key={index}
//             >
//               <ListItemText>
//                 <Typography variant="body2">{element.label}</Typography>
//               </ListItemText>
//               <FormControl variant="outlined">
//                 <ListItemSecondaryAction>
//                   <TextField 
//                     value={element.state}
//                     onChange={handleChange}  
//                     variant="outlined"  
//                     className={classes.numberInput}
//                     name={element.stateName}

//                     // input={
//                     //   <OutlinedInput
//                     //     labelWidth={0}
//                     //     classes={{ input: classes.numberInputInput }}
//                     //   />
//                     // }  
//                   />
//                   {/* <Select
//                     value={element.state}
//                     onChange={handleChange}
//                     input={
//                       <OutlinedInput
//                         name={element.stateName}
//                         labelWidth={0}
//                         className={classes.numberInput}
//                         classes={{ input: classes.numberInputInput }}
//                       />
//                     }
//                     MenuProps={{ disableScrollLock: true }}
//                   >
//                     {inputOptions.map((innerElement) => (
//                       <MenuItem value={innerElement} key={innerElement}>
//                         {innerElement}
//                       </MenuItem>
//                     ))}
//                   </Select> */}
//                 </ListItemSecondaryAction>
//               </FormControl>
//             </ListItem>
//           ))}
//         </Bordered>
//       </List>
//     </Fragment>
//   );
}

EnglishClass.propTypes = {
  onEmojiTextareaChange: PropTypes.func,
  DateTimePicker: PropTypes.elementType,
  EmojiTextArea: PropTypes.elementType,
  Dropzone: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
  classes: PropTypes.object,
  cropperFile: PropTypes.object,
  onCrop: PropTypes.func,
  onCropperClose: PropTypes.func,
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItem: PropTypes.func,
  onDrop: PropTypes.func,
  value: PropTypes.string,
  characters: PropTypes.number,
  uploadAt: PropTypes.instanceOf(Date),
  onChangeUploadAt: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(EnglishClass);
