import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextBox from './TextBox'
import { makeStyles } from '@material-ui/core/styles';
import { keys } from '@material-ui/core/styles/createBreakpoints';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
}));

const dialog_content_text = (resource_name) => {
  return (
    <DialogContentText>
      To add new {resource_name}, please enter following information.
    </DialogContentText>
  );
};

const dialog_title = (resource_name) => {
  return (
    <DialogTitle id="form-dialog-title">Add New {resource_name}</DialogTitle>
  );
};

const dialog_actions = (on_add, on_close) => {
  return (
    <DialogActions>
      <Button onClick={on_close} color="primary">
        Cancel
      </Button>
      <Button onClick={on_add} color="primary">
        Add
      </Button>
    </DialogActions>
  );
};

const dialog_content = (on_value_change, resource_name, post_options) => {
  return (
    <DialogContent>
      {dialog_content_text(resource_name)}
      {Object.keys(post_options).map( item => {
        if(post_options[item]["read_only"]) {
          return null
        }

        return <TextBox
          id={item} 
          label={post_options[item]["label"]} 
          required={post_options[item]["required"]}
          read_only={false}
          on_value_change={on_value_change}
        />

      })}
    </DialogContent>
  );
};

export default function AddNewResourceDialog({ 
  on_close, open, add_new_resource, resource_name, post_options }) {
  const classes = useStyles();

  if(post_options === null) {
    return null
  }

  var new_resource = {};

  Object.keys(post_options).map( item => {
    if(post_options[item]["read_only"]) {
      return;
    }
    new_resource[item] = ""
  });

  const on_value_change = (obj) => {
    new_resource[obj.id] = obj.value;
  };

  const on_add = (event) => {
    const is_empty_reducer = (accumulator, currentValue) => accumulator || (new_resource[currentValue]==="" && post_options[currentValue]['required']);
    if(Object.keys(new_resource).reduce(is_empty_reducer, false)) {
      return;
    }
    add_new_resource(resource_name, new_resource);
    on_close(event);
  };

  return (
    <div className={classes.root}>
      <Dialog 
        open={open} 
        onClose={on_close} 
        aria-labelledby="form-dialog-title">
          {dialog_title(resource_name)}
          {dialog_content(on_value_change, resource_name, post_options)}
          {dialog_actions(on_add, on_close)}
      </Dialog>
    </div>
  );
}

AddNewResourceDialog.propTypes = {
  on_close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  add_new_resource: PropTypes.func.isRequired,
};
