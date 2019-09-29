import React from 'react'
import { Link } from 'react-router-dom';
import Form from './Form';
//<=======usersign in component ========================
class UserSignIn extends React.Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }
//<=========change function , on change (keydown input) the value placed will be typed into textarea

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return {
        [name]: value
      };
    });
  }
//<===========handle my submit function ===========================
//<===========action will sign in on submit
//<===========if user credentials is incorrect an alert will say username or password is incorrect and signin will load again

  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } }; 
    const { emailAddress, password } = this.state;
    context.actions.signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          this.setState(() => {
            alert("username or password incorrect, Please try again")
            window.location.href="/signin"
            return { errors: ["Username or Password Incorrect"] };
            
          });
        } else {
          this.props.history.push(from); 
          console.log(`SUCCESS! ${emailAddress} is now signed in!`); 
        }
      }).catch(err => {
        console.log(err);
        this.props.history.push("/error");
      })
  }

//<=========render will display how the page will be displayed in html
  render() {
    const { emailAddress, password, errors } = this.state;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue={emailAddress} onChange={this.change} />
                <input id="password" name="password" type="password" className="" placeholder="Password" defaultValue={password} onChange={this.change} />
              </React.Fragment>
            )} />

          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    )
  }

  cancel = () => {
    this.props.history.push("/");
  }
}


export default UserSignIn