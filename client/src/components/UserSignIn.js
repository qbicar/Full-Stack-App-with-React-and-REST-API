import React from 'react'
import { Link } from 'react-router-dom';

class UserSignIn extends React.Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={this.submit}>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue="" /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" defaultValue="" /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button>
                <Link className="button button-secondary" to='/'>Cancel</Link></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    )
  }
}


export default UserSignIn