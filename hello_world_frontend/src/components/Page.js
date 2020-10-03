import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import HomePage from './HomePage'
import ProfilePage from './ProfilePage'
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
    delete_resource, change_page, page_number, is_login, 
    profile_request_is_fetching, send_profile_info_handle, profile_info,
    is_updating_profile_info_success}) {

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
    else if(page_name == "profile") {
      return (
        <ProfilePage 
          is_login={is_login}
          profile_request_is_fetching={profile_request_is_fetching}
          send_profile_info_handle={send_profile_info_handle}
          profile_info={profile_info}
          update_profile_info={send_profile_info_handle}
          is_updating_profile_info={profile_request_is_fetching}
          is_updating_profile_info_success={is_updating_profile_info_success}
          />
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
