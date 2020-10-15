import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, isWidthUp, withWidth } from "@material-ui/core";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PeopleIcon from '@material-ui/icons/People';
import ComputerIcon from "@material-ui/icons/Computer";
import BarChartIcon from "@material-ui/icons/BarChart";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import MeassageIcon from "@material-ui/icons/Message";
import PublicIcon from '@material-ui/icons/Public';
import calculateSpacing from "./calculateSpacing";
import FeatureCard from "./FeatureCard";
import VideoCallIcon from '@material-ui/icons/VideoCall';

const iconSize = 30;

const features = [
  {
    color: "#00C853",
    headline: "Free Discussion",
    text:
      "Join an international free discussion class with people from all around the world.",
    icon: <PeopleIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#6200EA",
    headline: "Calendar",
    text:
      "All of the classes will be scheduled through your calendar in order to notify you very easily.",
    icon: <CalendarTodayIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#0091EA",
    headline: "Messsage",
    text:
      "You can text all of the students and also teachers through our service.",
    icon: <MeassageIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  },
  {
    color: "#d50000",
    headline: "Online",
    text:
      "You just need a Skype account to join to the classes.",
    icon: <ComputerIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200"
  },
  {
    color: "#DD2C00",
    headline: "Speaking Class",
    text:
      "Teachers prepare you to have an international discussion in speaking classes.",
    icon: <BarChartIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0"
  },
  {
    color: "#64DD17",
    headline: "Record Classes",
    text:
      "All of the classes will be recorded and you can access the videos after classes.",
    icon: <VideoCallIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200"
  },
  {
    color: "#304FFE",
    headline: "Learning Videos",
    text:
      "You can also access all of the premium learning videos with international teachers.",
    icon: <OndemandVideoIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#C51162",
    headline: "Learning Podcasts",
    text:
      "You can also access all of the premium learning podcasts with international teachers.",
    icon: <MusicNoteIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#00B8D4",
    headline: "International Teacher",
    text:
      "We help you to become an international teacher, just set your classes through our website.",
    icon: <PublicIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  }
];

function FeatureSection(props) {
  const { width } = props;
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          Features
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width)}>
            {features.map(element => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  isWidthUp("md", width) ? element.mdDelay : element.smDelay
                }
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withWidth()(FeatureSection);
