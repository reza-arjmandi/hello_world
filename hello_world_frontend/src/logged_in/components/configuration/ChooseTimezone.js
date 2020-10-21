import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TimezonePicker from 'react-bootstrap-timezone-picker';

export default function ChooseTimezone({
  set_timezone,
  timezone, 
  }) {

  const handle_change_timezone = (timezoneName) => {
    set_timezone(timezoneName);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        What is your timezone?
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TimezonePicker
            absolute      = {false}
            placeholder   = "Select timezone..."
            onChange      = {handle_change_timezone}
          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
