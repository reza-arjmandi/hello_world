import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import ResourceCard from '../logged_out/components/videos/VideoCard';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    card: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

function DotsMobileStepper(classes, page_number, page_data, change_page) {
  const theme = useTheme();

  const handleNext = () => {
    const next_page = page_number + 1;
    change_page(next_page, page_data["next"]);
  };

  const handleBack = () => {
    const prev_page =  page_number - 1;
    change_page(prev_page, page_data["previous"]);
  };

  const page_count = Math.ceil(page_data["count"] / 6)
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
        <Button size="small" onClick={handleNext} disabled={page_data["next"] === null}>
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={page_number === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
  );
}

export default function ResourceCardsGrid({ 
  page_data, update_resource, delete_resource, change_page, page_number }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
      {page_data ? page_data["results"].map((data) => {
        return(
            <Grid item xs>
                <ResourceCard 
                  className={classes.card} 
                  {...data} />
            </Grid>
        );
      }) : null}
      </Grid>
      {page_data ? DotsMobileStepper(classes, page_number, page_data, change_page) : null}
    </div>
  );
}
