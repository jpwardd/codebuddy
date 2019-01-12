import React, { Component, Fragment } from 'react'
import { AUTH_TOKEN } from '../constants'
import { FormField, TextInput } from 'grommet';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
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
  border: 3px solid black;
  margin: 0 auto;
`


class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
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

      <div>
        <h4>{login ? 'Login' : 'Sign Up'}</h4>
        <div item>
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
              className="pointer button"
              onClick={() => this.setState({ login: !login })}
            >
              {login ? 'need to create an account?' : 'already have an account?'}
            </div>
            </div>
          </div>
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