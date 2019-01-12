import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Box, Button, FormField, TextInput } from 'grommet';
import { AUTH_TOKEN } from '../constants'


  const LOGIN_MUTATION = gql `
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`


class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
  
    const { email, password } = this.state
    return (
        <Mutation
          mutation={LOGIN_MUTATION}
          variables={{ email, password }}
          onCompleted={data => this._confirm(data)}
        >
      {mutation => (
      <div>

      <form>
        <Box>
        <FormField label='email'>
          <TextInput 
            value={email}
            name="email"
            onChange={this.handleChange}
            
          />
        </FormField>

        <FormField label='password'>
          <TextInput 
            value={password}
            name="password"
            type="password"
            onChange={this.handleChange}
          />
        </FormField>
        <div>
          <div>
          
            {<Button onClick={mutation}>Login</Button>}
          </div>
        </div>
      
        </Box>
      </form>
      </div>
      )}
    </Mutation>
    )
  }
    _confirm = async () => {
      const { token } = this.state.login
      this._saveUserData(token)
      this.props.history.push(`/`)
    }

    _saveUserData = token => {
      localStorage.setItem(AUTH_TOKEN, token)
    }
}
  
export default Login