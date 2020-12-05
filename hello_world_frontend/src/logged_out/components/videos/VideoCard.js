import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ReactPlayer from 'react-player'

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  main_card: {
    // [theme.breakpoints.down('sm')]: {
    //   width: window.innerWidth - 30,
    // },
    // [theme.breakpoints.up('sm')]: {
    //   width: 576,
    // },
  },
  
}));

export default function VideoCard({title, description, stream_url}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handle_expand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.main_card}>
      <div style={{
                  position: 'relative',
                  'padding-top': "56.25%" 
                }}>
        <ReactPlayer 
            style={{
                position: 'absolute',
                top: '0',
                left: '0',
            }}
            controls={true}
            width='100%'
            height='100%'
            url={stream_url} />
      </div>

      <CardActions disableSpacing>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {title}
          </Typography>
        </CardContent>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handle_expand}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {description}
        </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}