import React from 'react';

import LogDialogSelectField from './LogDialogSelectField';

export default function ParityField({ value='none', on_value_change }) {
    const [parity, set_parity] = React.useState(value);
    const id = "parity";
    const handle_parity_change = (value) => {
        set_parity(value);
        on_value_change({
            id,
            value,
        });
    };

    const parities = [
        "none", "odd", "even",
    ];

    return <LogDialogSelectField
      id={id}
      label="Parity"
      value={parity}
      on_change={handle_parity_change}
      items={parities}
    />
};