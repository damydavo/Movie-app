import React, { Component } from 'react';
import Input from './../common/input';

class LoginForm extends React.Component {

    state = {
        account: { username: '', password: '' }
    } 

    handleSubmit = e => {
        e.preventDefault()


        //call the server
        console.log('Submitted Successfully');
    }

    handleChange = ({ currentTarget:input }) => {
       const account = {...this.state.account};
       account[input.name] = input.value;
       this.setState({ account });
    }

    render() { 
        const { account } = this.state;
        return (
            <>
            <h2>Login Form</h2>
            <form onSubmit = { this.handleSubmit }>
                <Input name="username" label="username" value = {account.username} onChange={this.handleChange} />
                <Input name="password" label="password" value = {account.password} onChange={this.handleChange} />
             <button className="btn btn-primary">Login</button>
            </form>
            </>
        );
    }
}
 
export default LoginForm;