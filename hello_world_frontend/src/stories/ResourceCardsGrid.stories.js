import React from 'react';

import ResourceCardsGrid from '../components/ResourceCardsGrid';
import {action} from '@storybook/addon-actions';

export default {
    component: ResourceCardsGrid,
    title: 'ResourceCardsGrid',
    excludeStories: /.*_data$/,
};

export const grid_data = {
    page_data : {
        "count": 13,
        "next": "http://127.0.0.1:8000/stream/?page=2",
        "previous": null,
        "results": [
            {
                "url": "http://127.0.0.1:8000/stream/13/",
                "id": 13,
                "title": "French Bread",
                "description": "This is the fifth session with Amelie. If you are interested to know about french breads just watch this video. That was a great session.",
                "stream_url": "https://youtu.be/YOvUlHaOk6c"
            },
            {
                "url": "http://127.0.0.1:8000/stream/12/",
                "id": 12,
                "title": "Hello Espírito Santo, First meeting with Bruno from Brazil",
                "description": "Bruno is an English teacher in Espírito Santo. Espírito Santo is a beautiful state in Brazil. We've talked about landscapes and beautiful places in the Santo including Blue Stone Park/Lizard Stone, Pedra O Frade e a Freira and also we've talked about learning English.",
                "stream_url": "https://youtu.be/thAv5DEty8Y"
            },
            {
                "url": "http://127.0.0.1:8000/stream/11/",
                "id": 11,
                "title": "Hello France, First meeting with Susan and Chris from France",
                "description": "Susan and Chris originally from Britain, But now they are living in Toulouse.\r\nWe’ve talked about beautiful landscapes, foods, drinks,  cultures in Iran and France. That was a great session.",
                "stream_url": "https://youtu.be/e53lkKrfhew"
            },
            {
                "url": "http://127.0.0.1:8000/stream/10/",
                "id": 10,
                "title": "Hello The City Of Coffee, first meeting with Laritza from Bahia",
                "description": "Laritza is an English teacher from Bahia in Brazil. Brazil is the country of coffee, landscapes, rainforest, tribes and ...",
                "stream_url": "https://youtu.be/SzR03rgKDe0"
            },
            {
                "url": "http://127.0.0.1:8000/stream/9/",
                "id": 9,
                "title": "Hello Istanbul, first meeting with Ali from Istanbul",
                "description": "Ali is an English teacher from Istanbul, we've talked about customs, cultures, foods and favourite music and learning English.",
                "stream_url": "https://youtu.be/MODIsCNwNhE"
            },
            {
                "url": "http://127.0.0.1:8000/stream/8/",
                "id": 8,
                "title": "Exotic Pets",
                "description": "This is the 4th meeting with Amelie from Tennessee.\r\nWe've talked about animals, space, Mars Shot, famous actors from Tennessee including Dolly Parton, Elvis and Kenny Chesney.\r\nWe've talked about beautiful lizards like green anole, iguanas, chameleons, Draco Lizard, bearded dragon and white fox.\r\nThat was a great session.",
                "stream_url": "https://youtu.be/ZPM0BfiFlZU"
            }
        ]
    }
};

export const actions_data = {
    update_resource: action('update_resource'),
    delete_resource: action('delete_resource'),
    change_page: action('change_page'),
}

export const Default = () => {
    return <ResourceCardsGrid {...grid_data} {...actions_data} />;
};
