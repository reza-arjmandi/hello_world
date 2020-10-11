import React from 'react';

import HighlighedInformation from '../../shared/components/HighlightedInformation';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from "../../theme";
import { storiesOf, addDecorator } from '@storybook/react';

export default {
    component: HighlighedInformation,
    title: 'Shared/components/HighlighedInformation',
    excludeStories: /.*_data$/, 
};

export const Default = () => {
    return <HighlighedInformation theme={theme}/>;
}


storiesOf('Shared/components/HighlighedInformation', Default)
    .addDecorator(muiTheme(theme))
    