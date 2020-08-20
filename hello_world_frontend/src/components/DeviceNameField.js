import React from 'react';

import TextBox from './TextBox';

export default function DeviceNameField({ on_value_change }) {
    return <TextBox 
        id="device_name" 
        label="Device Name" 
        on_value_change={on_value_change}
    />;
};