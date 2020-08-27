import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player'

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
    },
}));

export default function HomePageCard({
    video_url, video_title, video_desciption}) {
    const classes = useStyles();

    return (
        <div>
          <Card className={classes.main_card}>
            <CardActionArea>
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
                         width='100%'
                         height='100%'
                         url={video_url} />
             </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {video_title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {video_desciption}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
    );
};
