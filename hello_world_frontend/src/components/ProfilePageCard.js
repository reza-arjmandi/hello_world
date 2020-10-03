import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';

export default function ProfilePageCard({profile_info, handle1}) {

   const [user_type, set_user_type] = React.useState(profile_info["user_type"]);
   const [timezone, set_timezone] = React.useState(profile_info["timezone"]);
   const [skype_link, set_skype_link] = React.useState(profile_info["skype_link"]);
    
   var user_profile_info = {
        user_type: profile_info["user_type"],
        timezone: profile_info["timezone"],
        skype_link: profile_info["skype_link"],
        is_completed: profile_info["is_completed"],
        Avatar: profile_info["Avatar"]
    };

  const handle_user_type = (event) => {
    user_profile_info['user_type'] = event.target.value; 
    set_user_type(event.target.value);
    // handle1(user_profile_info);
  };

  const handle_timezone = (event) => {
    user_profile_info['timezone'] = event; 
    set_timezone(event);
    // handle1(user_profile_info);
  };

  const handle_skype_link = (event) => {
    user_profile_info['skype_link'] = event.target.value; 
    set_skype_link(event.target.value);
    // handle1(user_profile_info);
  };

  return (

        <FormControl component="fieldset">
            <FormLabel component="legend">Are you an English...</FormLabel>
            <RadioGroup aria-label="user_type" name="user_type1" value={user_type} onChange={handle_user_type}>
                {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                <FormControlLabel value="learner" control={<Radio />} label="Learner" />
                <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
            </RadioGroup>
            <TimezonePicker
                    absolute      = {false}
                    placeholder   = "Select timezone..."
                    onChange={handle_timezone}
                    value={timezone}
                    />
            <TextField label="Skype link" onChange={handle_skype_link} value={skype_link}/>
        </FormControl>
  );
}
