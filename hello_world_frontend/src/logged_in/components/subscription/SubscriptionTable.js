import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  withStyles
} from "@material-ui/core";
import EnhancedTableHead from "../../../shared/components/EnhancedTableHead";
import ColorfulChip from "../../../shared/components/ColorfulChip";
import unixToDateString from "../../../shared/functions/unixToDateString";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import currencyPrettyPrint from "../../../shared/functions/currencyPrettyPrint";

const styles = theme => ({
  tableWrapper: {
    overflowX: "auto",
    width: "100%"
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main
  },
  contentWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2)
    },
    width: "100%"
  },
  dBlock: {
    display: "block !important"
  },
  dNone: {
    display: "none !important"
  },
  firstData: {
    paddingLeft: theme.spacing(3)
  }
});

const rows = [
  {
    id: "description",
    numeric: false,
    label: "Username"
  },
  {
    id: "balanceChange",
    numeric: false,
    label: "Class"
  },
  {
    id: "date",
    numeric: false,
    label: "Date"
  },
  {
    id: "skype_link",
    numeric: false,
    label: "Skype link"
  }
];

const rowsPerPage = 8;

function SubscriptionTable(props) {
  const { 
    subscription_contents, 
    theme, 
    classes,
    fetch_subscriptions,
  } = props;
  const [page, setPage] = useState(0);

  const handle_change_page = useCallback(
    (__, page_number) => {
      if(page_number > page && subscription_contents['next']) {
        fetch_subscriptions(subscription_contents['next'])
        setPage(page_number);
      }
      if(page_number < page && subscription_contents['previous']) {
        fetch_subscriptions(subscription_contents['previous'])
        setPage(page_number);
      }
    },
    [setPage, subscription_contents, fetch_subscriptions, page]
  );

  if (subscription_contents["results"].length > 0) {
    return (
      <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={subscription_contents["results"].length} rows={rows} />
          <TableBody>
            {subscription_contents['results']
              .map((subscription, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    {subscription.username}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {subscription.english_class > 0 ? (
                      <ColorfulChip
                        label={`+${currencyPrettyPrint(
                          subscription.english_class
                        )}`}
                        color={theme.palette.secondary.main}
                      />
                    ) : (
                      <ColorfulChip
                        label={currencyPrettyPrint(subscription.english_class)}
                        color={theme.palette.error.dark}
                      />
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {unixToDateString(subscription.date_joined)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {subscription.skype_link
                      ? unixToDateString(subscription.skype_link)
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={subscription_contents["results"].length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={handle_change_page}
          classes={{
            select: classes.dNone,
            selectIcon: classes.dNone,
            actions: subscription_contents["results"].length > 0 ? classes.dBlock : classes.dNone,
            caption: subscription_contents["results"].length > 0 ? classes.dBlock : classes.dNone
          }}
          labelRowsPerPage=""
        />
      </div>
    );
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>
        No subscription_contents received yet.
      </HighlightedInformation>
    </div>
  );
}

SubscriptionTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  subscription_contents: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles, { withTheme: true })(SubscriptionTable);
