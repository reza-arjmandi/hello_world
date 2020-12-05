import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';
import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import ClassContent from 
    '../../../../logged_in/components/classes/ClassContent';

export default {
    component: ClassContent,
    title: 'LoggedIn/components/classes/ClassContent',
    excludeStories: /.*_data$/, 
};

export const actions_data = {
  fetch_english_classes: action('fetch_english_classes'),
  openAddPostModal: action('openAddPostModal'),
};

export const teacher_profile_info_data = {
  profile_info: {
    user_type: "teacher",
  },
}

export const class_content_data = {
  class_contents: 
  {
      "count": 214,
      "next": "http://127.0.0.1:8000/english_class/?page=2",
      "previous": null,
      "results": [
          {
              "url": "http://127.0.0.1:8000/english_class/1/",
              "id": 1,
              "owner": "DsEtGn@WOfl.oeX",
              "title": "7J",
              "description": "UeEhmVKhkgImRZ0G974TdjWm1xHlfUDbx7mEGvMiO1uUM2yeXwevzu0P0CvfePKDSApptYjZap8qBEyiNHCrBywYc",
              "created": "2020-11-16",
              "date_time": "2020-12-20T12:00:00Z",
              "skype_link": "LiFGUw352DqDFAGkdMe",
              "image": "http://127.0.0.1:8000/photos/Q2.jpg",
              "capacity": 2
          },
          {
              "url": "http://127.0.0.1:8000/english_class/2/",
              "id": 2,
              "owner": "8lhx5hBv3@QkcYg.n4",
              "title": "bNxbhy7Ymg81",
              "description": "NvoYm71rtsAhb4TYE1mRVfyB5Y5yXAaC8xw7AfSfG7kEn3Ih7IVotVwS0podhwwg3",
              "created": "2020-11-16",
              "date_time": "2020-12-20T12:00:00Z",
              "skype_link": "XSsw027t9Rl",
              "image": "http://127.0.0.1:8000/photos/30O.jpg",
              "capacity": 3
          },
          {
              "url": "http://127.0.0.1:8000/english_class/3/",
              "id": 3,
              "owner": "8lhx5hBv3@QkcYg.n4",
              "title": "ylZzhtlAKrl5at1",
              "description": "wu9X6sIrdrDMuw1xNLjMk5fSRtZmNKvfs4DfiXPvfH2lOzzxT1OV4OmFX2T0Q1xVnYdOCCLHachxTWQSHzNflSQWiuOLcPTRbi",
              "created": "2020-11-16",
              "date_time": "2020-12-20T12:00:00Z",
              "skype_link": "Ujoo3CXDvABuS",
              "image": "http://127.0.0.1:8000/photos/Hapwxny.jpg",
              "capacity": 4
          },
          {
              "url": "http://127.0.0.1:8000/english_class/4/",
              "id": 4,
              "owner": "8lhx5hBv3@QkcYg.n4",
              "title": "YI8FD",
              "description": "xCGGSXyzE1g27YRNzSI8BwBY8xorSr8GtkM5McQ3pVsc4ZR",
              "created": "2020-11-16",
              "date_time": "2020-12-20T12:00:00Z",
              "skype_link": "OuWYpGvqjw",
              "image": "http://127.0.0.1:8000/photos/nfbQj0T.jpg",
              "capacity": 4
          },
          {
              "url": "http://127.0.0.1:8000/english_class/5/",
              "id": 5,
              "owner": "8lhx5hBv3@QkcYg.n4",
              "title": "W0dF",
              "description": "Oe77ZGZxpeR3SYrhLa0H3iBGUMEkAu8kgV33OmmmDgju2SaIPzkWdcAXXylnl3sbgmsJhZszI4Djt6fJvH",
              "created": "2020-11-16",
              "date_time": "2020-12-20T12:00:00Z",
              "skype_link": "tSJCUxLbEgDeQPML1cl",
              "image": "http://127.0.0.1:8000/photos/01.jpg",
              "capacity": 2
          },
          {
              "url": "http://127.0.0.1:8000/english_class/6/",
              "id": 6,
              "owner": "8lhx5hBv3@QkcYg.n4",
              "title": "XcYYQvB40AU",
              "description": "X0djkWX6OYIWu6PPpVHyTSyQPtZjQwEMhskNWxNJs68LFSMoNo7YvFrI1ue2Lt",
              "created": "2020-11-16",
              "date_time": "2020-12-20T12:00:00Z",
              "skype_link": "NtvZid15LSuj",
              "image": "http://127.0.0.1:8000/photos/HWn.jpg",
              "capacity": 2
          },
          {
            "url": "http://127.0.0.1:8000/english_class/5/",
            "id": 7,
            "owner": "8lhx5hBv3@QkcYg.n4",
            "title": "W0dF",
            "description": "Oe77ZGZxpeR3SYrhLa0H3iBGUMEkAu8kgV33OmmmDgju2SaIPzkWdcAXXylnl3sbgmsJhZszI4Djt6fJvH",
            "created": "2020-11-16",
            "date_time": "2020-12-20T12:00:00Z",
            "skype_link": "tSJCUxLbEgDeQPML1cl",
            "image": "http://127.0.0.1:8000/photos/01.jpg",
            "capacity": 2
        },
        {
            "url": "http://127.0.0.1:8000/english_class/6/",
            "id": 8,
            "owner": "8lhx5hBv3@QkcYg.n4",
            "title": "XcYYQvB40AU",
            "description": "X0djkWX6OYIWu6PPpVHyTSyQPtZjQwEMhskNWxNJs68LFSMoNo7YvFrI1ue2Lt",
            "created": "2020-11-16",
            "date_time": "2020-12-20T12:00:00Z",
            "skype_link": "NtvZid15LSuj",
            "image": "http://127.0.0.1:8000/photos/HWn.jpg",
            "capacity": 2
        }
      ]
  }
};

storiesOf('LoggedIn/components/classes/ClassContent', module)
.addDecorator(muiTheme(theme))
.addDecorator(StoryRouter())
.add('Student', () => {
    return (<div>
      <CssBaseline />
      <GlobalStyles />
      <ClassContent
        {...class_content_data}
        {...actions_data}
      />
    </div>
)})
.add('Teacher', () => {
  return (<div>
    <CssBaseline />
    <GlobalStyles />
    <ClassContent
      {...class_content_data}
      {...actions_data}
      {...teacher_profile_info_data}
    />
  </div>
)})