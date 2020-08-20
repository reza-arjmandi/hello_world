import React from 'react';

import HomePageCard from './HomePageCard';
import Particles from 'react-particles-js';

export default function HomePage({ 
    background_image, video_url, video_title, video_desciption }) {
        
    return (
        <div>
          <HomePageCard 
            video_url={video_url} 
            video_title={video_title} 
            video_desciption={video_desciption} 
        />
          <Particles
              params={{
                "particles": {
                    "number": {
                        "value": 200
                    },
                    "size": {
                        "value": 3
                    },
                },
                "interactivity": {
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        }
                    }
                }
            }}
            style={{
              width: '100%',
              backgroundImage: background_image 
            }}/>
        </div>
    );
};