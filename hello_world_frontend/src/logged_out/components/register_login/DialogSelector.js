import React, { useState, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import RegisterDialog from "./RegisterDialog";
import TermsOfServiceDialog from "./TermsOfServiceDialog";
import LoginDialog from "./LoginDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ModalBackdrop from "../../../shared/components/ModalBackdrop";

function DialogSelector(props) {
  const {
    dialogOpen,
    openTermsDialog,
    openRegisterDialog,
    openLoginDialog,
    openChangePasswordDialog,
    onClose,
    login,
    send_verification_code,
    login_step,
    login_request_result,
    login_request_is_fetching,
    email,
    open_profile_menu,
  } = props;
  const [loginStatus, setLoginStatus] = useState(null);
  const [loginCodeStatus, setLoginCodeStatus] = useState(null);
  const [registerStatus, setRegisterStatus] = useState(null);

  const _onClose = useCallback(() => {
    setLoginStatus(null);
    setRegisterStatus(null);
    setLoginCodeStatus(null);
    onClose();
  }, [onClose, setLoginStatus, setRegisterStatus, setLoginCodeStatus]);

  

  const printDialog = useCallback(() => {
    switch (dialogOpen) {
      case "register":
        return (
          <RegisterDialog
            onClose={_onClose}
            openTermsDialog={openTermsDialog}
            status={registerStatus}
            setStatus={setRegisterStatus}
          />
        );
      case "termsOfService":
        return <TermsOfServiceDialog onClose={openRegisterDialog} />;
      case "login":
        return (
          <LoginDialog
            onClose={_onClose}
            status={loginStatus}
            setStatus={setLoginStatus}
            openChangePasswordDialog={openChangePasswordDialog}

            loginCodeStatus={loginCodeStatus}
            setLoginCodeStatus={setLoginCodeStatus}
            login={login} 
            send_verification_code={send_verification_code} 
            login_step={login_step} 
            login_request_result={login_request_result}
            login_request_is_fetching={login_request_is_fetching}
            email={email}
            open_profile_menu={open_profile_menu}
          />
        );
      case "changePassword":
        return (
          <ChangePasswordDialog
            setLoginStatus={setLoginStatus}
            onClose={openLoginDialog}
          />
        );
      default:
    }
  }, [
    dialogOpen,
    openChangePasswordDialog,
    openLoginDialog,
    openRegisterDialog,
    openTermsDialog,
    _onClose,
    loginStatus,
    registerStatus,
    setLoginStatus,
    setRegisterStatus,
  ]);

  if((login_step === 1 || login_step === 2)  && dialogOpen=== "login") {
    return (
      <LoginDialog
        onClose={_onClose}
        status={loginStatus}
        setStatus={setLoginStatus}
        openChangePasswordDialog={openChangePasswordDialog}

        loginCodeStatus={loginCodeStatus}
        setLoginCodeStatus={setLoginCodeStatus}
        login={login} 
        send_verification_code={send_verification_code} 
        login_step={login_step} 
        login_request_result={login_request_result}
        login_request_is_fetching={login_request_is_fetching}
        email={email}
        open_profile_menu={open_profile_menu}
      />
    );
  }

  return (
    <Fragment>
      {dialogOpen && <ModalBackdrop open />}
      {printDialog()}
    </Fragment>
  );
}

DialogSelector.propTypes = {
  dialogOpen: PropTypes.string,
  openLoginDialog: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  openRegisterDialog: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
};

export default DialogSelector;
