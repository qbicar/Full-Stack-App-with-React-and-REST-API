import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    name: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      name,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value="" /></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value="" /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value="" /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value="" /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                value="" /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.submit}>Sign Up</button>
                <Link className="button button-secondary" to='/'>Cancel</Link></div>

            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    );
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
    const {
      name,
      emailAddress,
      password,
    } = this.state;

    // Create user
    const user = {
      name,
      emailAddress,
      password,
    };

    context.data.createUser(user)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push('/authenticated');
            });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });

  }

  cancel = () => {
    this.props.history.push('/');
  }
}