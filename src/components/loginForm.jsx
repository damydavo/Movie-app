import React, { Component } from 'react';
import Input from './../common/input';

class LoginForm extends React.Component {

    state = {
        account: { username: '', password: '' },
        errors: {}
    } 

    Validate = () => {
          const { account } = this.state;
          const errors = {};

          if(account.username.trim() === '')
          errors.username = 'Username cannot be empty';

          if(account.password.trim() === '')
          errors.password = 'Password cannot be empty';
         
          return Object.keys(errors).length === 0 ? null : errors;
    }

    handleSubmit = e => {
        e.preventDefault()

        const errors = this.Validate();

        this.setState({errors});
        if(errors) return


        //call the server
        console.log('Submitted Successfully');
    }

    handleChange = ({ currentTarget:input }) => {
      const errors = {...this.state.errors}
      const errorMessage = this.ValidateProperty(input);
      if (errorMessage) errors[input.name] = errorMessage;
      else delete errors[input.name]; 

       const account = {...this.state.account};
       account[input.name] = input.value;
       this.setState({ account, errors });
    }

    ValidateProperty = input => {
       if(input.name === 'username') {
           if(input.value.trim() === '') return 'Username cannot be empty';
       }

       if(input.name === 'password') {
        if(input.value.trim() === '') return 'Password cannot be empty';
    }
    }

    render() { 
        const { account, errors } = this.state;
        return (
            <>
            <h2>Login Form</h2>
            <form onSubmit = { this.handleSubmit }>
                <Input name="username" label="username" value = {account.username} onChange={this.handleChange} error = { errors.username } />
                <Input name="password" label="password" value = {account.password} onChange={this.handleChange} error = { errors.password }/>
             <button className="btn btn-primary">Login</button>
            </form>
            </>
        );
    }
}
 
export default LoginForm;