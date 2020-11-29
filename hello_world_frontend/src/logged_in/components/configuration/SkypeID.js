import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function SkypeID({
  set_skype_link,
  skype_link, 
  }) {
  
  const handle_change_skypeid = (event) => {
    set_skype_link(event.target.value);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Please enter your skype ID:
      </Typography>
      <TextField 
        id='skype_link' 
        required={true} 
        onChange={handle_change_skypeid}
        value={skype_link}
        variant="outlined"
        fullWidth
        />
    </React.Fragment>
  );
}
