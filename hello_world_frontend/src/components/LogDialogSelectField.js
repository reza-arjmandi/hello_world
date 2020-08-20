import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function LogDialogSelectField(
  {id, label, value, on_change, items}) {

    return (
        <TextField
            id={id}
            select
            margin="dense"
            label={label}
            value={value}
            onChange={(event) => on_change(event.target.value)}
            variant="outlined"
            fullWidth
          >
            {items.map((option) => (
              <MenuItem key={option} value={option}>
                  {option}
              </MenuItem>
            ))}
          </TextField>
    );
};

LogDialogSelectField.protoTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.object,
    on_change: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
};