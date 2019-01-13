import React, { Component, Fragment } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Box, FormField, TextInput, Image } from 'grommet';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'




const LOGIN_MUTATION = gql `
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const SIGNUP_MUTATION = gql `
  mutation SignupMutation($email: String!, $password: String!, $name: String!, $username: String!) {
    signup(email: $email, password: $password, name: $name, username: $username) {
      token
    }
  }
`

const LoginContainer = styled.div`
  justify-content: center;
  max-width: 300px;
  width: 100%;
  padding: 10px;
  margin-top: 5vh;
  flex-grow: 1;
  border-radius: 10px;
  background: #173449;
  border-bottom: 15px solid #21D581;
`
const InputContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
`


class Login extends Component {
  state = {
    login: false, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
    username: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { login, email, password, name, username } = this.state
    return (
      <Box responsive={true} justify="start" animation="slideUp" align="center" basis="large" fill="horizontal">
        <h1>codebuddy</h1>
      <LoginContainer>
      <InputContainer>
        <div>
          {!login && (
          <Fragment>
            <FormField label="name">
              <TextInput
                value={name}
                onChange={this.handleChange}
                type="text"
                name="name"
              />
            </FormField>

            <FormField label="username">
              <TextInput
                value={username}
                onChange={this.handleChange}
                type="text"
                name="username"
              />
            </FormField>
          </Fragment>
          )}
          <FormField label="email">
            <TextInput
              value={email}
              onChange={this.handleChange}
              type="text"
              name="email"
            />
          </FormField>

        <FormField label='password'>
          <TextInput
            value={password}
            onChange={this.handleChange}
            type="password"
            name="password"
          />
        </FormField>
        </div>


        <div className="flex mt3">
           <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name, username }}
            onCompleted={data => this._confirm(data)}
           >
            {mutation => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? 'login' : 'create account'}
              </div>
            )}
            </Mutation>
            <div
              onClick={() => this.setState({ login: !login })}
            >
              {
                Login ? 'already have an account?' : 'need to create an account?'
              }
            </div>
        </div>
      </InputContainer>
          </LoginContainer>
      </Box>
        )
      }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login