import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
  const { context } = props;
  const authUser = context.authenticatedUser;

  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        {authUser ?
        <nav>
          <span>Welcome, {authUser.firstName} {authUser.lastName}</span>
          <NavLink className="signout" to="/signout">Sign Out</NavLink>
        </nav> :
      <nav>
        <NavLink className="home" to="/">Home</NavLink>
        <NavLink className="signup" to="/signup">Sign Up</NavLink>
        <NavLink className="signin" to="/signin">Sign In</NavLink>
      </nav>
        }
    </div >
    </div>
)}
export default Header