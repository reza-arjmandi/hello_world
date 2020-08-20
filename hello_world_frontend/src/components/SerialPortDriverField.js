import React from 'react';

import TextBox from './TextBox';

export default function SerialPortDriverField({ on_value_change }) {
  return <TextBox 
        id="driver" 
        label="Serial Port Driver" 
        on_value_change={on_value_change}
    />;
};