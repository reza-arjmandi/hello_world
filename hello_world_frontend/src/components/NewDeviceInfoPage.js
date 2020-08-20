import React from 'react';
import Grid from '@material-ui/core/Grid';

import BaudRateField from './BaudRateField';
import FlowControlField from './FlowControlField';
import ParityField from './ParityField';
import StopBitsField from './StopBitsField';
import DeviceNameField from './DeviceNameField';
import SerialPortDriverField from './SerialPortDriverField';
import CharacterSizeField from './CharacterSizeField';

const device_name_field = (on_value_change) => {
  return (
    <Grid item xs={12}>
      <DeviceNameField on_value_change={on_value_change} />
    </Grid>
  );
};

const driver_field = (on_value_change) => {
  return (
    <Grid item xs={6}>
      <SerialPortDriverField on_value_change={on_value_change} />
    </Grid>
  );
};

const baud_rate_field = (on_value_change) => {
  return (
    <Grid item xs={6}>
      <BaudRateField on_value_change={on_value_change} />
    </Grid>
  );
};

const flow_control_field = (on_value_change) => {
  return (
    <Grid item xs={3}>
      <FlowControlField on_value_change={on_value_change} />
    </Grid>
  );
};

const parity_field = (on_value_change) => {
  return (
    <Grid item xs={3}>
      <ParityField on_value_change={on_value_change} />
    </Grid>
  );
};

const stop_bits_field = (on_value_change) => {
  return (
    <Grid item xs={3}>
      <StopBitsField on_value_change={on_value_change} />
    </Grid>
  );
};

const character_size_field = (on_value_change) => {
  return (
    <Grid item xs={3}>
      <CharacterSizeField on_value_change={on_value_change} />
    </Grid>
  );
};

export default function NewDeviceInfoPage({ on_value_change }) {
    return (
      <Grid container spacing={1}>
        {device_name_field(on_value_change)}
        {driver_field(on_value_change)}
        {baud_rate_field(on_value_change)}
        {flow_control_field(on_value_change)}
        {parity_field(on_value_change)}
        {stop_bits_field(on_value_change)}
        {character_size_field(on_value_change)}
      </Grid>
    );
};