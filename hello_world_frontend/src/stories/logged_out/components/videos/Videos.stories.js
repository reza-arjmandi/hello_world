import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { muiTheme } from 'storybook-addon-material-ui';
import StoryRouter from 'storybook-react-router';

import { CssBaseline } from "@material-ui/core";

import theme from "../../../../theme";
import GlobalStyles from "../../../../GlobalStyles";

import Videos from 
    '../../../../logged_out/components/videos/Videos';

export default {
    component: Videos,
    title: 'LoggedOut/components/videos/Videos',
    excludeStories: /.*_data$/, 
};

export const videos_data = { 
    videos: {
    "count": 10,
    "next": "http://127.0.0.1:8000/stream/?page=2",
    "previous": null,
    "results": [
        {
            "url": "http://127.0.0.1:8000/stream/10/",
            "id": 10,
            "title": "Hello Turkey, meeting with Kenan from Konya",
            "description": "ideo Cover:\r\nSama: is a Sufi ceremony performed as dhikr. Sama means \"listening\", while dhikr means \"remembrance\". These rituals often include singing, playing instruments, dancing, recitation of poetry and prayers, wearing symbolic attire, and other rituals. It is a particularly popular form of worship in Sufism.\r\nCappadocia balloon festival: Cappadocia is the place where over 100 hot air balloons fly everyday. The Fiesta truly is a sight that can only be seen in Ürgüp. Held over four days in July at Ürgüp Center, the event is completely free with charges made for parking on the event site.\r\nWe had a great conversation with Kenan from Konya. He is a great english teacher.\r\nKonya is a city south of Ankara in Turkey’s Central Anatolia region. It’s a pilgrimage destination for Sufis, focused on the tomb of the founder of the Mevlana order, Jelaleddin Rumi, in the Mevlana Museum. Sema whirling dervish ceremonies take place at the Mevlana Cultural Center, east of the museum. The 12th-century Alaeddin Mosque is surrounded by the green parks of Alaeddin Hill.",
            "stream_url": "https://youtu.be/XQnHPN-uBqk"
        },
        {
            "url": "http://127.0.0.1:8000/stream/9/",
            "id": 9,
            "title": "Hello Colombia, the land of coffee meeting with Erika from Santander",
            "description": "Video cover: The Rock of Guatape, or simply La Piedra or El Peñol, is a landmark inselberg also known as The Stone of El Peñol, in Colombia. It is located in the town and municipality of Guatapé, Antioquia.\r\nWe had a conversation with Erika. She is a great english teacher. If you want to know about the history of Colombia just watch this video.",
            "stream_url": "https://youtu.be/W1WJTWpSHwk"
        },
        {
            "url": "http://127.0.0.1:8000/stream/8/",
            "id": 8,
            "title": "Hello Brazil, meeting with Breda from Rio Grande do Sul",
            "description": "Itaimbezinho: The Itaimbezinho is a canyon between state of Rio Grande do Sul and Santa Catarina, Brazil, about 170 km from Porto Alegre. It is part of the Aparados da Serra National Park.\r\nAparados da Serra National Park: Aparados da Serra National Park is in south Brazil, near the Atlantic coast. It’s known for the deep, dramatic Itaimbezinho Canyon, one of many chasms that cut through the park’s plateaus. Footpaths, like the Rio do Boi trail, pass waterfalls and make a steep, rocky descent to the canyon floor. The lush landscape is home to howler monkeys, ocelots, parrots and other rare wildlife. The town Cambará do Sul is nearby.\r\nBreda is a great English teacher. We've talked about beautiful landscapes in Rio Grande do Sul, Porto Alegre, Amazonas, Manaus and Acre. And also we've talked about favorite foods and drinks like Chimarrão. That was a great session.",
            "stream_url": "https://youtu.be/afN2_-cTmxM"
        },
        {
            "url": "http://127.0.0.1:8000/stream/7/",
            "id": 7,
            "title": "Hello Iraq, meeting with Shang and Nuha from Kurdistan",
            "description": "Erbil Citadel: Erbil is the capital and most populated city in the Kurdistan Region in northern Iraq. Human settlement at Erbil may be dated back to the 5th millennium BC, which would make the city one of the oldest continuously inhabited areas in the world. At the heart of the city is the ancient Citadel of Erbil and Mudhafaria Minaret. The earliest historical reference to the region dates to the Third Dynasty of Ur of Sumer, when King Shulgi mentioned the city of Urbilum.\r\nShang and Nuha are English teachers. They are multilingual. They can speak in 5 languages.\r\nWe’ve talked about beautiful landscapes, favorite foods, drinks, music, movies and … in their country. That was a great session.",
            "stream_url": "https://youtu.be/OeYGBFw8O9E"
        },
        {
            "url": "http://127.0.0.1:8000/stream/6/",
            "id": 6,
            "title": "Hello Web Developers, meeting with Kwabena from New Jersey",
            "description": "Kwabena is a web developer. He is working for ITLIZE company.\r\nITLIZE company is located in New York city.\r\nWe've talked about his career, Agile process in his company, TDD practice, job interviews and average salaries of software developers in his state. That was a great conversation.",
            "stream_url": "https://youtu.be/FnYNEnD-05U"
        },
        {
            "url": "http://127.0.0.1:8000/stream/5/",
            "id": 5,
            "title": "Hello India, meeting with Priyanka from India",
            "description": "Video Cover: The Taj Mahal is a white tomb built in the 16th century by the Mughal emperor, Shah Jahan in memory of his wife, Mumtaz Mahal.\r\nThe building is in the city of Agra, Uttar Pradesh. Widely thought as one of the most beautiful buildings in the world, it is one of India's biggest tourist attractions.\r\nIt is listed as a UNESCO World Heritage Site, together with the Agra Fort, 2.5 kilometers away. It was listed as one of the 7 Wonders of the World in 2007.It is located on the south bank of Yamuna river in Agra. It is a splendid monument.\r\nIn this video we had a conversation with Priyanka. She is a great English teacher.\r\nWe’ve talked about India, including Taj Mahal, Golden Temple, Chandni Chowk market, Holi festival, favorite foods, drinks and ….\r\nThat was really a great conversation.",
            "stream_url": "https://youtu.be/9NjYkQpfc70"
        }
    ]
    }
}

export const actions_data = {
    selectVideos: action('selectVideos'),
};

storiesOf('LoggedOut/components/videos/Videos', module)
    .addDecorator(StoryRouter())
    .addDecorator(muiTheme(theme))
    .add('Default', () => (
        <div>
          <CssBaseline />
          <GlobalStyles />
          <Videos 
            {...videos_data}
            {...actions_data}
          />
        </div>
    ))