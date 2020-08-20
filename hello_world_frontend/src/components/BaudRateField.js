import React from 'react';

import LogDialogSelectField from './LogDialogSelectField'

export default function BaudRateField({ value=9600, on_value_change }){
    const [baud_rate, set_baud_rate] = React.useState(value);
    const id = "baud_rate";

    const handle_baud_rate_change = (value) => {
        set_baud_rate(value);
        on_value_change({
            id,
            value,
        });
    };

    const baud_rates = [
        110, 300, 600, 1200, 2400, 4800, 9600, 14400, 
        19200, 38400, 57600, 115200, 128000, 256000,
    ];

    return <LogDialogSelectField
      id={id}
      label="Baud Rate"
      value={baud_rate}
      on_change={handle_baud_rate_change}
      items={baud_rates}
    />;
};