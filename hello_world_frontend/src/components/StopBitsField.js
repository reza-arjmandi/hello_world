import React from 'react';

import LogDialogSelectField from './LogDialogSelectField';

export default function StopBitsField({value=1, on_value_change }) {
    const [stop_bits, set_stop_bits] = React.useState(value);
    const id = "stop_bits";
    const handle_stop_bits_change = (value) => {
        set_stop_bits(value);
        on_value_change({
            id,
            value,
        });
    };

    const stop_bits_type = [
        1, 1.5, 2,
    ];
    
    return <LogDialogSelectField
      id={id}
      label="Stop Bits"
      value={stop_bits}
      on_change={handle_stop_bits_change}
      items={stop_bits_type}
    />;
};