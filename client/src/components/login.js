import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { GoogleLogin } from 'react-google-login';

class LogIn extends Component {
    state = {
        signInComplete: false
    }

    onSignInSuccess = async (response) => {
        let tokenId = response.tokenId
        await this.props.signInUser(tokenId)
        this.setState({ signInComplete: true })
    }

    onSignInFailed = (response) => {
        console.log("Failed to sign in to Google", response)
    }

    render() {
        return (
            <LoginWrapper>
                <h1>Login with Google</h1>
                {this.state.signInComplete ? <Redirect to="/users" />
                    : <GoogleLogin
                        clientId={process.env.REACT_APP_HOW_TO_HYGGE_GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        autoLoad={true}
                        onSuccess={this.onSignInSuccess}
                        onFailure={this.onSignInFailed}
                        cookiePolicy={'single_host_origin'}
                    />
                }
            </LoginWrapper>

        )
    }
}

export default LogIn
