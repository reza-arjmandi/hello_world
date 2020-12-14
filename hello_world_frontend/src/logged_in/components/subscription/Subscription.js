import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper, withStyles } from "@material-ui/core";
import SubscriptionTable from "./SubscriptionTable";
import SubscriptionInfo from "./SubscriptionInfo";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Subscription(props) {
  const {
    subscription_contents,
    classes,
    openAddBalanceDialog,
    selectSubscription,
    fetch_subscriptions
  } = props;

  useEffect(() => {
    fetch_subscriptions();
    selectSubscription();
  }, [selectSubscription, fetch_subscriptions]);

  return (
    <Paper>
      <List disablePadding>
        <SubscriptionInfo openAddBalanceDialog={openAddBalanceDialog} />
        <Divider className={classes.divider} />
        <SubscriptionTable 
          subscription_contents={subscription_contents} 
          fetch_subscriptions={fetch_subscriptions}
        />
      </List>
    </Paper>
  );
}

Subscription.propTypes = {
  classes: PropTypes.object.isRequired,
  subscriptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectSubscription: PropTypes.func.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired
};

export default withStyles(styles)(Subscription);
