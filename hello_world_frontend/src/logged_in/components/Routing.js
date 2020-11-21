import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Dashboard from "./dashboard/Dashboard";
import Classes from "./classes/Classes";
import EnglishClass from "./classes/EnglishClass";
import Subscription from "./subscription/Subscription";
import Configuration from "./configuration/Configuration";
import PropsRoute from "../../shared/components/PropsRoute";

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "82.5%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});

function Routing(props) {
  const {
    classes,
    EmojiTextArea,
    ImageCropper,
    Dropzone,
    DateTimePicker,
    pushMessageToSnackbar,
    class_contents,
    transactions,
    toggleAccountActivation,
    CardChart,
    statistics,
    targets,
    setTargets,
    fetch_english_classes,
    isAccountActivated,
    selectDashboard,
    selectClasses,
    selectSubscription,
    openAddBalanceDialog,
    profile_info, 
    send_profile_info_handle,
    update_profile_info,
    log_out,
    create_english_class,
  } = props;
  return (
    <div className={classes.wrapper}>
      <Switch>
        
      <PropsRoute
          path="/c/123"
          // EmojiTextArea={EmojiTextArea}
          // ImageCropper={ImageCropper}
          // Dropzone={Dropzone}
          // DateTimePicker={DateTimePicker}
          // pushMessageToSnackbar={pushMessageToSnackbar}
          // class_contents={class_contents}
          // fetch_english_classes={fetch_english_classes}
          // selectClasses={selectClasses}
          // profile_info={profile_info}
          // create_english_class={create_english_class}
          component={EnglishClass}
          
          // transactions={transactions}
          // pushMessageToSnackbar={pushMessageToSnackbar}
          // selectSubscription={selectSubscription}
          // openAddBalanceDialog={openAddBalanceDialog}
        />

        <PropsRoute
          path="/c/classes"
          component={Classes}
          EmojiTextArea={EmojiTextArea}
          ImageCropper={ImageCropper}
          Dropzone={Dropzone}
          DateTimePicker={DateTimePicker}
          pushMessageToSnackbar={pushMessageToSnackbar}
          class_contents={class_contents}
          fetch_english_classes={fetch_english_classes}
          selectClasses={selectClasses}
          profile_info={profile_info}
          create_english_class={create_english_class}
        />
        
        

        <PropsRoute
          path="/c/subscription"
          component={Subscription}
          transactions={transactions}
          pushMessageToSnackbar={pushMessageToSnackbar}
          selectSubscription={selectSubscription}
          openAddBalanceDialog={openAddBalanceDialog}
        />
        <PropsRoute
          path="/c/configuration"
          component={Configuration}
          profile_info={profile_info} 
          send_profile_info_handle={send_profile_info_handle}
          log_out={log_out}
        />
        <PropsRoute
          path=""
          component={Dashboard}
          toggleAccountActivation={toggleAccountActivation}
          pushMessageToSnackbar={pushMessageToSnackbar}
          CardChart={CardChart}
          statistics={statistics}
          targets={targets}
          setTargets={setTargets}
          isAccountActivated={isAccountActivated}
          selectDashboard={selectDashboard}
          profile_info={profile_info} 
          update_profile_info={update_profile_info}
        />
      </Switch>
    </div>
  );
}

Routing.propTypes = {
  classes: PropTypes.object.isRequired,
  EmojiTextArea: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
  Dropzone: PropTypes.elementType,
  DateTimePicker: PropTypes.elementType,
  pushMessageToSnackbar: PropTypes.func,
  setTargets: PropTypes.func.isRequired,
  fetch_english_classes: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleAccountActivation: PropTypes.func,
  CardChart: PropTypes.elementType,
  statistics: PropTypes.object.isRequired,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
  selectDashboard: PropTypes.func.isRequired,
  selectPosts: PropTypes.func.isRequired,
  selectSubscription: PropTypes.func.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Routing));
