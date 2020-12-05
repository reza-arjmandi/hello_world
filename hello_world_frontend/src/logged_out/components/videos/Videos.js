import React, { useEffect } from "react";
import classNames from "classnames";
import { 
  Grid, Box, isWidthUp, withWidth, withStyles } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import VideoCard from "./VideoCard";

const styles = (theme) => ({
  videosContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    maxWidth: 1280,
    width: "100%",
  },
  wrapper: {
    minHeight: "60vh",
  },
  noDecoration: {
    textDecoration: "none !important",
  },
});


function DotsMobileStepper(classes, page_number, videos, change_page) {
  const theme = useTheme();

  const handle_next = () => {
    const next_page = page_number + 1;
    change_page(next_page, videos["next"]);
  };

  const handle_back = () => {
    const prev_page =  page_number - 1;
    change_page(prev_page, videos["previous"]);
  };

  const page_count = Math.ceil(videos["count"] / 6)
  if (page_count === 1) {
    return null
  }
  
  return (
    <MobileStepper
      variant="dots"
      steps={page_count}
      position="static"
      activeStep={page_number}
      className={classes.root}
      nextButton={
        <Button 
          size="small" 
          onClick={handle_next} 
          disabled={videos["next"] === null}>
          Next
          {theme.direction === 'rtl' 
            ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" 
        onClick={handle_back} 
        disabled={page_number === 0}>
          {theme.direction === 'rtl' 
            ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
  );
}

function getVerticalVideos(width, videos) {
  const gridRows = [[], [], []];
  let rows;
  let xs;
  if (isWidthUp("md", width)) {
    rows = 3;
    xs = 4;
  } else if (isWidthUp("sm", width)) {
    rows = 2;
    xs = 6;
  } else {
    rows = 1;
    xs = 12;
  }
  if(videos) {
    videos.results.forEach((video, index) => {
      gridRows[index % rows].push(
        <Grid key={video.id} item xs={12}>
          <Box mb={3}>
            <VideoCard
              title={video.title}
              description={video.description}
              stream_url={video.stream_url}
            />
          </Box>
        </Grid>
      );
    });
  }
  return gridRows.map((element, index) => (
    <Grid key={index} item xs={xs}>
      {element}
    </Grid>
  ));
}

function Videos(props) {
  const { 
    classes, width, videos, selectVideos, page_number, change_page } = props;

  useEffect(() => {
    selectVideos();
  }, [selectVideos]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      className={classNames(classes.wrapper, "lg-p-top")}
    >
      <div className={classes.videosContentWrapper}>
        <Grid container spacing={3}>
          {getVerticalVideos(width, videos)}
        </Grid>
        {videos ? 
          DotsMobileStepper(classes, page_number, videos, change_page) : null}
      </div>
    </Box>
  );
}

export default withWidth()(withStyles(styles, { withTheme: true })(Videos));
