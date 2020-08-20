import React from 'react';

import TextBox from './TextBox';

export default function CharacterSizeField({default_value=8, on_value_change }) {
  return <TextBox
    id="character_size"
    label="Character Size"
    type="number"
    default_value={default_value}
    on_value_change={on_value_change}
  />;
};