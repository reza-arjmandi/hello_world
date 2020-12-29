import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TablePagination,
  Divider,
  Toolbar,
  Typography,
  Button,
  Paper,
  Box,
  withStyles,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import DetailsIcon from '@material-ui/icons/Details';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import SelfAligningImage from "../../../shared/components/SelfAligningImage";
import HighlightedInformation from 
  "../../../shared/components/HighlightedInformation";

import toLocaleDateTime from '../../../shared/functions/toLocaleDateTime';

const styles = {
  dBlock: { display: "block" },
  dNone: { display: "none" },
  toolbar: {
    justifyContent: "space-between",
  },
};

const rowsPerPage = 8;

function ClassContent(props) {
  const {
    fetch_english_classes,
    class_contents,
    openAddPostModal,
    classes,
    profile_info, 
    english_classes_page,
    set_english_classes_page,
    is_my_classes_filtered,
    set_is_my_classes_filtered,
    history,
  } = props;

  const handle_change_my_classes = useCallback(() => {
    if(!is_my_classes_filtered){
      set_english_classes_page(0);
    }
    else {
      set_english_classes_page(0);
    }
    set_is_my_classes_filtered(!is_my_classes_filtered);

  }, [is_my_classes_filtered, 
    set_english_classes_page,
    set_is_my_classes_filtered, 
    fetch_english_classes]);

  const on_detail = useCallback((class_content) => {
    history.push(`/c/classes/${class_content['id']}`);
  }, [history]);

  const handle_change_page = useCallback(
    (__, page_number) => {
      if(page_number > english_classes_page && class_contents['next']) {
        fetch_english_classes(class_contents['next'])
        set_english_classes_page(page_number);
      }
      if(page_number < english_classes_page && class_contents['previous']) {
        fetch_english_classes(class_contents['previous'])
        set_english_classes_page(page_number);
      }
    },
    [set_english_classes_page, 
      class_contents, 
      fetch_english_classes, 
      english_classes_page]
  );

  const printـimage_grid = useCallback(() => {
    if (class_contents['results'].length > 0) {
      return (
        <Box p={1}>
          <Grid container spacing={1}>
            {class_contents['results'].map((post) => (
                <Grid item xs={6} sm={4} md={3} key={post.id}>
                  <SelfAligningImage
                    src={post['image']}
                    title={post['title']}
                    date_time={toLocaleDateTime(post['date_time'])}
                    options={[
                      {
                        name: "Detail",
                        onClick: () => {
                          on_detail(post);
                        },
                        icon: <DetailsIcon />,
                      },
                    ]}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      );
    }
    return (
      <Box m={2}>
        <HighlightedInformation>
          No English classes added yet. Click on &quot;NEW&quot; to create your first one.
        </HighlightedInformation>
      </Box>
    );
  }, [class_contents, on_detail]);

  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">English Classes</Typography>
        { profile_info && profile_info.user_type === "teacher" &&
        <Grid
          container
          direction="column"
          justify="flex-end"
          alignItems="flex-end"
        > 
            <Button
            variant="contained"
            color="secondary"
            onClick={openAddPostModal}
            disableElevation
            >
              Add English Class
            </Button>
            <FormControlLabel
            control={
              <Switch 
                checked={is_my_classes_filtered} 
                onChange={handle_change_my_classes} 
                name="checkedA" 
              />}
            label="My classes"
            />
          </Grid>
        }
      </Toolbar>
      <Divider />
      {printـimage_grid()}
      <TablePagination
        component="div"
        count={class_contents['count']}
        rowsPerPage={rowsPerPage}
        page={english_classes_page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onChangePage={handle_change_page}
        classes={{
          select: classes.dNone,
          selectIcon: classes.dNone,
          actions: class_contents['results'].length > 0 
            ? classes.dBlock : classes.dNone,
          caption: class_contents['results'].length > 0 
            ? classes.dBlock : classes.dNone,
        }}
        labelRowsPerPage=""
      />
    </Paper>
  );
}

ClassContent.propTypes = {
  openAddPostModal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  class_contents: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPosts: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withRouter(withStyles(styles)(ClassContent));
