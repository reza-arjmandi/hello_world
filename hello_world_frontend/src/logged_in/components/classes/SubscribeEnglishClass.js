import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import toLocaleDateTime from '../../../shared/functions/toLocaleDateTime';

const useStyles = makeStyles({
    root: {
    //   maxWidth: 345,
    },
    media: {
      height: 240,
    },
  });

function SubscribeEnglishClass(props) {
  const {
    pushMessageToSnackbar,
    subscribe_english_class,
    selected_english_class,
    clear_selected_english_class,
    onClose,
    history,
  } = props;

  const on_back = useCallback(() => {
    history.push("/c/classes");
    clear_selected_english_class();
    onClose();
  }, [history, clear_selected_english_class, onClose]);

  const on_subscribe = useCallback(()=> {
    subscribe_english_class(selected_english_class['url'])
    pushMessageToSnackbar({text: "You have just subscribed to the class"});
    on_back();
  }, [subscribe_english_class, 
    selected_english_class, 
    on_back, 
    pushMessageToSnackbar]);

  const classes = useStyles();

  return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={selected_english_class["image"]}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {selected_english_class["title"]}
            </Typography>
            <Typography gutterBottom variant="h6" component="h4">
              {toLocaleDateTime(selected_english_class["date_time"])}
            </Typography>
            <Typography gutterBottom variant="h6" component="h4">
              capacity:{selected_english_class["capacity"]}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {selected_english_class["description"]}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick={on_back}>
            Back
          </Button>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary" onClick={on_subscribe}>
            Subscribe
          </Button>
        </CardActions>
      </Card>
    );
}

SubscribeEnglishClass.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
  Dropzone: PropTypes.elementType,
  EmojiTextArea: PropTypes.elementType,
  DateTimePicker: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
};

export default withRouter(SubscribeEnglishClass);
