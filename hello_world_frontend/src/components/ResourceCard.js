import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
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
    [theme.breakpoints.down('sm')]: {
      width: window.innerWidth - 30,
    },
    [theme.breakpoints.up('sm')]: {
      width: 576,
    },
  },
  
}));

export default function ResourceCard({title, description, stream_url}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
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
          onClick={handleExpandClick}
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


// export default function ResourceCard({
//   post_options, 
//   resource_data, update_resource, delete_resource}) {

// const classes = useStyles();

// const handle_delete_click = () => {
//   // delete_resource({
//   //   device_name,
//   // });
// };

// // var log = {
// //   device_name,
// //   driver,
// //   log_file,
// //   baud_rate,
// //   flow_control,
// //   parity,
// //   stop_bits,
// //   character_size
// // };

// const on_value_change = (item) => {
//   // log[item.id] = item.value;
//   // update_log(device_name, log);
// };

// return (
//   <div style={{
//     position: 'relative',
//     'padding-top': "56.25%" 
//   }}>
//     <ReactPlayer 
//       style={{
//         position: 'absolute',
//         top: '0',
//         left: '0',
//       }}
//       width='100%'
//       height='100%'
//       url={resource_data['stream_url']} />
//   </div>
// );
// }