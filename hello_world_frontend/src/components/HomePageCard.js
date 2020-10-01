import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player'
import Typed from 'react-typed';
import 'fontsource-roboto';
import WebFont from 'webfontloader';
import 'react-typed/dist/animatedCursor.css';

WebFont.load({
  google: {
    families: ['Roboto:300,400,700', 'sans-serif']
  }
});
const useStyles = makeStyles((theme) => ({
    main_card: {
      [theme.breakpoints.down('sm')]: {
        width: window.innerWidth - 10,
      },
      [theme.breakpoints.up('sm')]: {
        width: 576,
      },
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      top: '50%',
      color:'#000000',
      background:'#ffb515',
      'font-family': 'Roboto',
      
      
    },
}));

export default function HomePageCard({
    video_url, video_title, video_desciption}) {
    const classes = useStyles();

    return (
        <div>

          <Typography 
            className={classes.main_card} 
            gutterBottom 
            variant="h4" 
            component="h5">
            <Typed
              strings={[
                  'Hello World!',
                  'Would you like to learn english with people from all around the world?',
                  'Would you like to be an international english teacher?',
                  'OK, just login in our website'
                ]}
              typeSpeed={40}
              backSpeed={50}
              loop 
              />
          </Typography>
        </div>
    );
};
