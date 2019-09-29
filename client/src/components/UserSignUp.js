import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: []
  }


  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }


  submit = () => {
    const { context } = this.props;
    let errorList = [];

    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const emailAddress = this.state.emailAddress;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;

    //input validators
    if (firstName === '') {
      errorList.push('First Name must be provided.');
    }
    if (lastName === '') {
      errorList.push('Last Name must be provided.');
    }
    if (emailAddress === '') {
      errorList.push('Email Address must be provided.');
    }
    if (password === '') {
      errorList.push('Password must be provided.');
    }
    else if (confirmPassword === '') {
      errorList.push('Confirm Password must be provided.');
    }
    else if (password !== confirmPassword) {
      errorList.push('Password and Confirm Password do not match.');
    }

    if (errorList.length > 0) {
      this.setState(() => {
        return { errors: errorList };
      });
    }else{

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors
    } = this.state;

const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };

      context.data.createUser(user)
          if (errors.length) {
            this.setState(() => {
              window.location.href='/'
              return { errors: [errors] };
            });
          } else {
            alert("SUCCESS ,You Are Now Signed Up")
            window.location.href="/" 
          };
    }
  }

  cancel = () => {
    this.props.history.push('/');
  }


  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
         

            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign Up"
              elements={() => (
                <React.Fragment>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    placeholder="First Name"
                    onChange={this.change} />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={this.change} />
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="text"
                    value={emailAddress}
                    placeholder="Email Address"
                    onChange={this.change} />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={this.change} />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={this.change} />
                </React.Fragment>
              )} />
            <p>
              Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                        </p>
          
        </div>
      </div>
    )
  }
}