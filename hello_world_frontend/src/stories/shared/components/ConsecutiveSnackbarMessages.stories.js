import React, { useCallback, useState} from "react";

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

import ConsecutiveSnackbarMessages from 
    '../../../shared/components/ConsecutiveSnackbarMessages';

export default {
    component: ConsecutiveSnackbarMessages,
    title: 'Shared/components/ConsecutiveSnackbarMessages',
    excludeStories: /.*_data$/, 
};

storiesOf('Shared/components/ConsecutiveSnackbarMessages', module)
    .addDecorator(muiTheme(theme))
    .add('Default', () => {
        const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);

        const getPushMessageFromChild = useCallback(
            (pushMessage) => {
                setPushMessageToSnackbar(() => pushMessage);
            },
            [setPushMessageToSnackbar]
          );

        return (<div>
          <CssBaseline />
          <GlobalStyles />
          <ConsecutiveSnackbarMessages 
            getPushMessageFromChild={getPushMessageFromChild}
          />
        </div>
    )})