import React, { 
  memo, useCallback, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages 
  from "../../shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";

const styles = (theme) => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
});

function Main(props) {
  const { 
    classes, 
    profile_info, 
    send_profile_info_handle,
    is_login,
    history,
    fetch_profile_info,
    fetch_profile_avatar,
    fetch_english_classes,
    profile_avatar,
    log_out,
    class_contents,
    create_english_class,
    selected_english_class,
    fetch_class_by_id,
    update_english_class,
    delete_english_class,
    subscribe_english_class,
  } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [EmojiTextArea, setEmojiTextArea] = useState(null);
  const [hasFetchedEmojiTextArea, setHasFetchedEmojiTextArea] = 
    useState(false);
  const [ImageCropper, setImageCropper] = useState(null);
  const [hasFetchedImageCropper, setHasFetchedImageCropper] = useState(false);
  const [Dropzone, setDropzone] = useState(null);
  const [hasFetchedDropzone, setHasFetchedDropzone] = useState(false);
  const [DateTimePicker, setDateTimePicker] = useState(null);
  const [hasFetchedDateTimePicker, setHasFetchedDateTimePicker] = useState(
    false
  );
  const [transactions, setTransactions] = useState([]);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);

  const fetchRandomTransactions = useCallback(() => {
    const transactions = [];
    const iterations = 32;
    const oneMonthSeconds = Math.round(60 * 60 * 24 * 30.5);
    const transactionTemplates = [
      {
        description: "Starter subscription",
        isSubscription: true,
        balanceChange: -1499,
      },
      {
        description: "Premium subscription",
        isSubscription: true,
        balanceChange: -2999,
      },
      {
        description: "Business subscription",
        isSubscription: true,
        balanceChange: -4999,
      },
      {
        description: "Tycoon subscription",
        isSubscription: true,
        balanceChange: -9999,
      },
      {
        description: "Added funds",
        isSubscription: false,
        balanceChange: 2000,
      },
      {
        description: "Added funds",
        isSubscription: false,
        balanceChange: 5000,
      },
    ];
    let curUnix = Math.round(
      new Date().getTime() / 1000 - iterations * oneMonthSeconds
    );
    for (let i = 0; i < iterations; i += 1) {
      const randomTransactionTemplate =
        transactionTemplates[
          Math.floor(Math.random() * transactionTemplates.length)
        ];
      const transaction = {
        id: i,
        description: randomTransactionTemplate.description,
        balanceChange: randomTransactionTemplate.balanceChange,
        paidUntil: curUnix + oneMonthSeconds,
        timestamp: curUnix,
      };
      curUnix += oneMonthSeconds;
      transactions.push(transaction);
    }
    transactions.reverse();
    setTransactions(transactions);
  }, [setTransactions]);

  const selectDashboard = useCallback(() => {
    smoothScrollTop();
    document.title = "HelloWorld - Dashboard";
    setSelectedTab("Dashboard");
  }, [setSelectedTab]);

  const selectClasses = useCallback(() => {
    smoothScrollTop();
    document.title = "HelloWorld - Classes";
    setSelectedTab("Classes");
    if (!hasFetchedEmojiTextArea) {
      setHasFetchedEmojiTextArea(true);
      import("../../shared/components/EmojiTextArea").then((Component) => {
        setEmojiTextArea(Component.default);
      });
    }
    if (!hasFetchedImageCropper) {
      setHasFetchedImageCropper(true);
      import("../../shared/components/ImageCropper").then((Component) => {
        setImageCropper(Component.default);
      });
    }
    if (!hasFetchedDropzone) {
      setHasFetchedDropzone(true);
      import("../../shared/components/Dropzone").then((Component) => {
        setDropzone(Component.default);
      });
    }
    if (!hasFetchedDateTimePicker) {
      setHasFetchedDateTimePicker(true);
      import("../../shared/components/DateTimePicker").then((Component) => {
        setDateTimePicker(Component.default);
      });
    }
  }, [
    setSelectedTab,
    setEmojiTextArea,
    setImageCropper,
    setDropzone,
    setDateTimePicker,
    hasFetchedEmojiTextArea,
    setHasFetchedEmojiTextArea,
    hasFetchedImageCropper,
    setHasFetchedImageCropper,
    hasFetchedDropzone,
    setHasFetchedDropzone,
    hasFetchedDateTimePicker,
    setHasFetchedDateTimePicker,
  ]);

  const selectSubscription = useCallback(() => {
    smoothScrollTop();
    document.title = "HelloWorld - Subscription";
    setSelectedTab("Subscription");
  }, [setSelectedTab]);

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );

  const routeTo = useCallback(() => {
      if(profile_info === null) {
        fetch_profile_info();
      } 

      if(profile_info && profile_info.is_completed === false) {
        history.push("/c/configuration")
      }
  
    }, [profile_info, fetch_profile_info, history]
  );

  useEffect(() => {
    fetchRandomTransactions();
    routeTo();
  }, [fetchRandomTransactions, routeTo ]);

  if(is_login === false || profile_info === null) {
    return (
      <div>
      </div>
    )
  }
  
  return (
    <Fragment>
      {profile_info.is_completed 
      && <NavBar
        selectedTab={selectedTab}
        profile_info={profile_info}
        fetch_profile_avatar={fetch_profile_avatar}
        profile_avatar={profile_avatar}
        log_out={log_out}
      /> }
      {profile_info.is_completed && <ConsecutiveSnackbarMessages
        getPushMessageFromChild={getPushMessageFromChild}
      /> }
      <main className={classNames(classes.main)}>
        <Routing
          ImageCropper={ImageCropper}
          EmojiTextArea={EmojiTextArea}
          Dropzone={Dropzone}
          DateTimePicker={DateTimePicker}
          pushMessageToSnackbar={pushMessageToSnackbar}
          transactions={transactions}
          class_contents={class_contents}
          selectDashboard={selectDashboard}
          selectClasses={selectClasses}
          selectSubscription={selectSubscription}
          fetch_english_classes={fetch_english_classes}
          profile_info={profile_info} 
          send_profile_info_handle={send_profile_info_handle}
          update_profile_info={send_profile_info_handle}
          log_out={log_out}
          create_english_class={create_english_class}
          selected_english_class={selected_english_class}
          fetch_class_by_id={fetch_class_by_id}
          update_english_class={update_english_class}
          delete_english_class={delete_english_class}
          subscribe_english_class={subscribe_english_class}
        />
      </main>
    </Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(memo(Main)));
