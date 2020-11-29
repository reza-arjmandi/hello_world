import React, { useState, useCallback } from "react";
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
import SelfAligningImage from "../../../shared/components/SelfAligningImage";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";

const styles = {
  dBlock: { display: "block" },
  dNone: { display: "none" },
  toolbar: {
    justifyContent: "space-between",
  },
};

const rowsPerPage = 6;

function ClassContent(props) {
  const {
    pushMessageToSnackbar,
    fetch_english_classes,
    class_contents,
    openAddPostModal,
    classes,
    profile_info, 
    history,
  } = props;
  const [page, setPage] = useState(0);
  const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState(false);
  const [isDeletePostDialogLoading, setIsDeletePostDialogLoading] = useState(
    false
  );

  const closeDeletePostDialog = useCallback(() => {
    setIsDeletePostDialogOpen(false);
    setIsDeletePostDialogLoading(false);
  }, [setIsDeletePostDialogOpen, setIsDeletePostDialogLoading]);

  const deletePost = useCallback(() => {
    setIsDeletePostDialogLoading(true);
    setTimeout(() => {
      const _posts = [...class_contents];
      const index = _posts.find((element) => element.id === deletePost.id);
      _posts.splice(index, 1);
      // setPosts(_posts);
      pushMessageToSnackbar({
        text: "Your post has been deleted",
      });
      closeDeletePostDialog();
    }, 1500);
  }, [
    class_contents,
    // setPosts,
    setIsDeletePostDialogLoading,
    pushMessageToSnackbar,
    closeDeletePostDialog,
  ]);

  const on_detail = useCallback((class_content) => {
    history.push(`/c/classes/${class_content['id']}`);

  }, [history]);

  const handleChangePage = useCallback(
    (__, page_number) => {
      if(page_number > page && class_contents['next']) {
        fetch_english_classes(class_contents['next'])
        setPage(page_number);
      }
      if(page_number < page && class_contents['previous']) {
        fetch_english_classes(class_contents['previous'])
        setPage(page_number);
      }
    },
    [setPage, class_contents, fetch_english_classes, page]
  );

  const printImageGrid = useCallback(() => {
    if (class_contents['results'].length > 0) {
      return (
        <Box p={1}>
          <Grid container spacing={1}>
            {class_contents['results'].map((post) => (
                <Grid item xs={6} sm={4} md={3} key={post.id}>
                  <SelfAligningImage
                    src={post['image']}
                    title={post['title']}
                    date_time={post['date_time']}
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
  }, [class_contents, on_detail, page]);

  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">English Classes</Typography>
        { profile_info && profile_info.user_type === "teacher" &&
          <Button
          variant="contained"
          color="secondary"
          onClick={openAddPostModal}
          disableElevation
          >
            Add English Class
          </Button>
        }
      </Toolbar>
      <Divider />
      {printImageGrid()}
      <TablePagination
        component="div"
        count={class_contents['count']}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onChangePage={handleChangePage}
        classes={{
          select: classes.dNone,
          selectIcon: classes.dNone,
          actions: class_contents['results'].length > 0 ? classes.dBlock : classes.dNone,
          caption: class_contents['results'].length > 0 ? classes.dBlock : classes.dNone,
        }}
        labelRowsPerPage=""
      />
      <ConfirmationDialog
        open={isDeletePostDialogOpen}
        title="Confirmation"
        content="Do you really want to delete the post?"
        onClose={closeDeletePostDialog}
        loading={isDeletePostDialogLoading}
        onConfirm={deletePost}
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
