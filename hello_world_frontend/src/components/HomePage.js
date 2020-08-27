import React from 'react';

import HomePageCard from './HomePageCard';
import Particles from 'react-particles-js';

export default function HomePage({ 
    background_image, video_url, video_title, video_desciption }) {
        
    return (
        <div style={{
            backgroundImage: background_image ,
            'background-repeat':'no-repeat',
            'position':'fixed',
            '-webkit-background-size': 'cover',
            '-moz-background-size': 'cover',
            '-o-background-size': 'cover',
            'background-size': 'cover',
            'background-attachment': 'fixed',
            'height': window.innerHeight,
            top:'0px',
            left:'0px',
            width:'100%',
            height:'100%',
            'z-index':'-1',
          }}>
          <HomePageCard 
            video_url={video_url} 
            video_title={video_title} 
            video_desciption={video_desciption} 
        />
          <Particles
              params={{
                "particles": {
                    "number": {
                        "value": 50
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
            />
        </div>
    );
};