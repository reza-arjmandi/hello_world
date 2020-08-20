import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(2),
  },
}));

export default function AddResourceButton(
  {onAddResource, resource_name, is_enable_add_resource}) {
    const classes = useStyles();

    if (is_enable_add_resource === false){
      return (
        <div>
        </div>
      );
    }

    return (
      <div className={classes.root}>
        {/* <Fab 
        variant="extended" 
        color="primary"
        onClick={() => onAddResource()}
        className={classes.fab}>
          <AddIcon className={classes.extendedIcon} />
          Add {resource_name}
      </Fab> */}
      </div>
    );
};

AddResourceButton.protoTypes = {
  onAddResource: PropTypes.func,
}
