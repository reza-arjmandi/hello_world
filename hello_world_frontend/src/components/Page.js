import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import HomePage from './HomePage'
import ResourceCardsGrid from './ResourceCardsGrid'

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

export default function Page({ 
    is_fetching, page_name, post_options, page_data, update_resource, 
    delete_resource, change_page, page_number }) {

    const classes = useStyles();
    
    if(is_fetching) {
        return (
          <div className={classes.root}>
            <LinearProgress />
          </div>
        )
    }

    if(page_name == "home") {
        const home_page_card_data = {
            video_url: page_data['results'][0]['introduction_video_url'],
            video_title: page_data['results'][0]['introduction_video_title'],
            video_desciption: page_data['results'][0]['introduction_video_description'],
            background_image: `url(${page_data['results'][0]['background_image']})`,
        };
        return (
          <HomePage {...home_page_card_data}/>
        );
    }
    else {
        return (
            <ResourceCardsGrid 
                post_options={post_options} 
                page_data={page_data} 
                update_resource={update_resource} 
                delete_resource={delete_resource}
                change_page={change_page}
                page_number={page_number} />
        );
    }
};
