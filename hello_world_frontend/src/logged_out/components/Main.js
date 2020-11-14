import React, { memo, useState, useEffect, useCallback } from "react";

import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import "aos/dist/aos.css";
import DialogSelector from "./register_login/DialogSelector";
import Routing from "./Routing";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";

AOS.init({ once: true });

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    overflowX: "hidden",
  },
});

function Main({
  classes, 
  blog_posts_data,
  fetch_blog_posts,
  fetch_videos,
  login,
  send_verification_code,
  login_step,
  login_request_result,
  login_request_is_fetching,
  email,
  open_profile_menu,
  videos, 
  page_number, 
  change_page,
  is_login,
  history,
  }) {
  const [selectedTab, setSelectedTab] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(null);

  const selectHome = useCallback(() => {
    smoothScrollTop();
    document.title =
      "HelloWorld - Learn English With People From All Around The World";
    setSelectedTab("Home");
  }, [setSelectedTab]);

  const selectBlog = useCallback(() => {
    smoothScrollTop();
    document.title = "HelloWorld - Blog";
    setSelectedTab("Blog");
  }, [setSelectedTab]);

  const selectVideos = useCallback(() => {
    smoothScrollTop();
    document.title = "HelloWorld - Videos";
    setSelectedTab("Videos");
  }, [setSelectedTab]);

  const openLoginDialog = useCallback(() => {
    setDialogOpen("login");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const closeDialog = useCallback(() => {
    setDialogOpen(null);
  }, [setDialogOpen]);

  const openRegisterDialog = useCallback(() => {
    setDialogOpen("register");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const openTermsDialog = useCallback(() => {
    setDialogOpen("termsOfService");
  }, [setDialogOpen]);

  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  const openChangePasswordDialog = useCallback(() => {
    setDialogOpen("changePassword");
  }, [setDialogOpen]);

  useEffect(()=> {
    fetch_blog_posts();
    fetch_videos();

    if(is_login) {
      setTimeout(() => {
        open_profile_menu();
        history.push("/c");
      }, 150);
    }
  }, [is_login, history, open_profile_menu, fetch_blog_posts, fetch_videos]);

  return (
    <div className={classes.wrapper}>
      <DialogSelector
        openLoginDialog={openLoginDialog}
        dialogOpen={dialogOpen}
        onClose={closeDialog}
        openTermsDialog={openTermsDialog}
        openRegisterDialog={openRegisterDialog}
        openChangePasswordDialog={openChangePasswordDialog}
        login={login}
        send_verification_code={send_verification_code}
        login_step={login_step}
        login_request_result={login_request_result}
        login_request_is_fetching={login_request_is_fetching}
        email={email}
        open_profile_menu={open_profile_menu}
      />
      <NavBar
        selectedTab={selectedTab}
        selectTab={setSelectedTab}
        openLoginDialog={openLoginDialog}
        openRegisterDialog={openRegisterDialog}
        mobileDrawerOpen={isMobileDrawerOpen}
        handleMobileDrawerOpen={handleMobileDrawerOpen}
        handleMobileDrawerClose={handleMobileDrawerClose}
      />
      <Routing
        blogPosts={blog_posts_data}
        selectHome={selectHome}
        selectBlog={selectBlog}
        selectVideos={selectVideos}
        videos={videos}
        page_number={page_number}
        change_page={change_page}
      />
      <Footer />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(memo(Main)));
