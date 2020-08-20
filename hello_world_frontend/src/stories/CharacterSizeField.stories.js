import React from 'react';

import CharacterSizeField from '../components/CharacterSizeField';
import { action_data } from './TextBox.stories';

export default {
    component: CharacterSizeField,
    title: 'CharacterSizeField',
};

export const Default = () => {
    return <CharacterSizeField {...action_data} />;
};