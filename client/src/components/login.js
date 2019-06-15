import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

class LogIn extends Component {
  state = {
    signInComplete: false
  };

  onSignInSuccess = async response => {
    let tokenId = response.tokenId
    let userResponse = await axios.post('/users/login', {token: tokenId})
    this.props.onLogin(userResponse.data)
  };

  onSignInFailed = response => {
    console.log("Failed to sign in to Google", response);
  };

  render() {
    return (
      <div>
        <h1>User is not logged in. Login with Google to use the site</h1>
        <GoogleLogin
          clientId={process.env.REACT_APP_GAINS_GOOGLE_CLIENT_ID}
          buttonText="Login"
          autoLoad={true}
          onSuccess={this.onSignInSuccess}
          onFailure={this.onSignInFailed}
        //   cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}

export default LogIn;
