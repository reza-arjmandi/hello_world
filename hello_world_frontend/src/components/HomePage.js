import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import HomePageCard from './HomePageCard';
import Particles from 'react-particles-js';


export default function HomePage({ 
    background_image, video_url, video_title, video_desciption }) {
        
    const theme = useTheme();
    const down_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const between_sm_md = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const between_md_lg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const up_lg = useMediaQuery(theme.breakpoints.up('lg'));

    var particles_count = 10;
    var particles_size = 1;

    if(down_sm) {
        particles_count = 20;
        particles_size = 1;
    }

    if(between_sm_md) {
        particles_count = 30;
        particles_size = 1;
    }

    if(between_md_lg) {
        particles_count = 40;
        particles_size = 2;
    }

    if(up_lg) {
        particles_count = 100;
        particles_size = 3;
    }

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
                        "value": particles_count
                    },
                    "size": {
                        "value": particles_size
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
              }}/>
        </div>
    );
};