import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  ListItemText,
  OutlinedInput,
  AccordionDetails,
  MenuItem,
  FormControl,
  Select,
  Box,
  withStyles,
} from "@material-ui/core";

import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import withWidth from "@material-ui/core/withWidth";
import Bordered from "../../../shared/components/Bordered";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";

const styles = (theme) => ({
  numberInput: {
    width: 110,
  },
  timezoneInput: {
    width: 210,
  },
  numberInputInput: {
    padding: "9px 34px 9px 14.5px",
  },
  dBlock: { display: "block" },
  listItemLeftPadding: {
    paddingRight: theme.spacing(3),
  },
  AccordionDetails: {
    paddintTop: theme.spacing(0),
    justifyContent: "flex-end",
  },
});
const inputOptions = ["teacher", "learner"];

function Settings1(props) {
  const { 
    classes, 
    pushMessageToSnackbar, 
    profile_info,
    update_profile_info,
  } = props;
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isDefaultLoading, setIsDefaultLoading] = useState(false);
  const [user_type, set_user_type] = useState(profile_info.user_type);
  const [timezone, set_timezone] = useState(profile_info.timezone);
  const [option3, setOption3] = useState("None");
  const [option4, setOption4] = useState("None");
  const [option5, setOption5] = useState("2 Days");
  const [skype_link, set_skype_link] = useState(profile_info.skype_link);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      switch (name) {
        case "user_type": {
          set_user_type(value);
          break;
        }
        // case "option2": {
        //   setOption2(value);
        //   break;
        // }
        // case "option3": {
        //   setOption3(value);
        //   break;
        // }
        // case "option4": {
        //   setOption4(value);
        //   break;
        // }
        // case "option5": {
        //   setOption5(value);
        //   break;
        // }
        case "skype_link": {
          set_skype_link(value);
          break;
        }
        default:
          throw new Error("No branch selected in switch statement.");
      }
    },
    [setOption3, setOption4, setOption5, set_skype_link]
  );

  const resetState = useCallback(() => {
    setIsSaveLoading(false);
    setIsDefaultLoading(false);
    // setOption1("None");
    // setOption2("None");
    // setOption3("None");
    // setOption4("None");
    // setOption5("2 Days");
    // set_skype_link(7500);
  }, [
    setIsSaveLoading,
    setIsDefaultLoading,
    setOption3,
    setOption4,
    setOption5,
    set_skype_link,
  ]);

  const onSetDefault = useCallback(() => {
    setIsDefaultLoading(true);
    setTimeout(() => {
      pushMessageToSnackbar({
        text: "Your settings have been reset to default",
      });
      resetState();
    }, 1500);
  }, [pushMessageToSnackbar, resetState]);

  const onSubmit = useCallback(() => {
    update_profile_info(
      profile_info.url, 
      user_type, 
      timezone, 
      skype_link, 
      profile_info.avatar
      );
    setIsSaveLoading(true);
    setTimeout(() => {
      pushMessageToSnackbar({
        text: "Your settings have been saved",
      });
      setIsSaveLoading(false);
    }, 1500);
  }, [
    setIsSaveLoading, 
    pushMessageToSnackbar, 
    skype_link,
    user_type,
    timezone
  ]);

  const handle_change_timezone = (timezoneName) => {
    set_timezone(timezoneName);
};

  const inputs = [
    {
      state: user_type,
      label: "User type",
      stateName: "user_type",
    },
    // {
    //   state: option2,
    //   label: "Option 2",
    //   stateName: "option2",
    // },
    // {
    //   state: option3,
    //   label: "Option 3",
    //   stateName: "option3",
    // },
    // {
    //   state: option4,
    //   label: "Option 4",
    //   stateName: "option4",
    // },
  ];

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Settings 1</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.dBlock}>
        <List disablePadding>
          <Bordered disableVerticalPadding disableBorderRadius>
            {inputs.map((element, index) => (
              <ListItem
                className="listItemLeftPadding"
                disableGutters
                divider
                key={index}
              >
                <ListItemText>
                  <Typography variant="body2">{element.label}</Typography>
                </ListItemText>
                <FormControl variant="outlined">
                  <ListItemSecondaryAction
                    className={classes.ListItemSecondaryAction}
                  >
                    <Select
                      value={element.state}
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          name={element.stateName}
                          labelWidth={0}
                          className={classes.numberInput}
                          classes={{ input: classes.numberInputInput }}
                        />
                      }
                      MenuProps={{ disableScrollLock: true }}
                    >
                      {inputOptions.map((innerElement) => (
                        <MenuItem value={innerElement} key={innerElement}>
                          {innerElement}
                        </MenuItem>
                      ))}
                    </Select>
                  </ListItemSecondaryAction>
                </FormControl>
              </ListItem>
            ))}
            <ListItem className="listItemLeftPadding" disableGutters divider>
              <ListItemText>
                <Typography variant="body2">Timezone</Typography>
              </ListItemText>
              <FormControl variant="outlined">
                <ListItemSecondaryAction
                  className={classes.ListItemSecondaryAction}
                >
                  <TimezonePicker
                    absolute      = {false}
                    placeholder   = "Select timezone..."
                    className={classes.timezoneInput}
                    classes={{ input: classes.numberInputInput }}
                    onChange      = {handle_change_timezone}
                    value={timezone}
                  />
                  {/* <Select
                    value={option5}
                    onChange={handleChange}
                    input={
                      <OutlinedInput
                        name="option5"
                        labelWidth={0}
                        className={classes.numberInput}
                        classes={{ input: classes.numberInputInput }}
                      />
                    }
                    MenuProps={{ disableScrollLock: true }}
                  >
                    {[
                      "Always",
                      "6 Hours",
                      "12 Hours",
                      "1 Day",
                      "2 Days",
                      "3 Days",
                      "1 Week",
                    ].map((element) => (
                      <MenuItem value={element} key={element}>
                        {element}
                      </MenuItem>
                    ))}
                  </Select> */}
                </ListItemSecondaryAction>
              </FormControl>
            </ListItem>
            <ListItem className="listItemLeftPadding" disableGutters>
              <ListItemText>
                <Typography variant="body2">Skype link</Typography>
              </ListItemText>
              <FormControl variant="outlined">
                <ListItemSecondaryAction
                  className={classes.ListItemSecondaryAction}
                >
                  <OutlinedInput
                    labelWidth={0}
                    name="skype_link"
                    value={skype_link}
                    onChange={handleChange}
                    className={classes.timezoneInput}
                    classes={{ input: classes.numberInputInput }}
                    inputProps={{ step: 20 }}
                  />
                </ListItemSecondaryAction>
              </FormControl>
            </ListItem>
          </Bordered>
        </List>
      </AccordionDetails>
      <AccordionDetails className={classes.AccordionDetails}>
        {/* <Box mr={1}>
          <Button
            onClick={onSetDefault}
            disabled={isSaveLoading || isDefaultLoading}
          >
            Default {isDefaultLoading && <ButtonCircularProgress />}
          </Button>
        </Box> */}
        <Button
          variant="contained"
          color="secondary"
          disabled={isSaveLoading || isDefaultLoading}
          onClick={onSubmit}
        >
          Save {isSaveLoading && <ButtonCircularProgress />}
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}

Settings1.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withWidth()(withStyles(styles, { withTheme: true })(Settings1));
