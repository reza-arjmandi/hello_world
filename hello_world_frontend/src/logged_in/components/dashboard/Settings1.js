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
  const [user_type, set_user_type] = useState(profile_info.user_type);
  const [timezone, set_timezone] = useState(profile_info.timezone);
  const [skype_link, set_skype_link] = useState(profile_info.skype_link);

  const handle_change = useCallback(
    (event) => {
      const { name, value } = event.target;
      switch (name) {
        case "user_type": {
          set_user_type(value);
          break;
        }
        case "skype_link": {
          set_skype_link(value);
          break;
        }
        default:
          throw new Error("No branch selected in switch statement.");
      }
    },
    [set_skype_link, set_user_type]
  );

  const on_submit = useCallback(() => {
    update_profile_info(profile_info.url, user_type, timezone, skype_link, 
      profile_info.avatar);
    setIsSaveLoading(true);
    setTimeout(() => {
      pushMessageToSnackbar({
        text: "Your settings have been saved",
      });
      setIsSaveLoading(false);
    }, 1500);
  }, [
    setIsSaveLoading, pushMessageToSnackbar, skype_link,
    user_type, timezone, profile_info.avatar, profile_info.url,
    update_profile_info ]);

  const handle_change_timezone = useCallback((timezoneName) => {
    set_timezone(timezoneName);
  }, [set_timezone]);

  const inputs = [
    {
      state: user_type,
      label: "User type",
      stateName: "user_type",
    },
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
                      onChange={handle_change}
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
                  <TimezonePicker
                    absolute      = {false}
                    placeholder   = "Select timezone..."
                    className={classes.timezoneInput}
                    classes={{ input: classes.numberInputInput }}
                    onChange      = {handle_change_timezone}
                    value={timezone}
                  />
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
                    onChange={handle_change}
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
        <Button
          variant="contained"
          color="secondary"
          disabled={isSaveLoading }
          onClick={on_submit}
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
