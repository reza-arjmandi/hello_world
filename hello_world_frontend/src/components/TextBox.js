import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

export default function TextBox({ 
    id, label, type, required, read_only, default_value, on_value_change
}) {
    if (required) {
        return (
            <TextField
                margin="dense"
                id={id}
                label={label}
                variant="outlined"
                required
                type={type}
                onChange={(event) => { 
                    on_value_change({
                        id,
                        value: event.target.value,
                    })
                }}
                defaultValue={default_value}
                InputProps={{
                    readOnly: read_only,
                }}
                fullWidth
            />
        );
    }

    return (
        <TextField
            margin="dense"
            id={id}
            label={label}
            variant="outlined"
            type={type}
            onChange={(event) => { 
                on_value_change({
                    id,
                    value: event.target.value,
                })
            }}
            defaultValue={default_value}
            InputProps={{
                readOnly: read_only,
            }}
            fullWidth
        />
    );
}

TextBox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.object,
    required: PropTypes.bool.isRequired, 
    read_only: PropTypes.bool.isRequired,
    default_value: PropTypes.object.isRequired,
    on_value_change: PropTypes.func.isRequired
};

TextBox.defaultProps = {
    type: "text",
};