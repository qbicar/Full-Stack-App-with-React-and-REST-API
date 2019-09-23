import React from 'react'

const Header = () => (
  <div className="header">
    <div className="bounds">
      <header>
        <h1 className="header--logo">Courses</h1>
        <nav><a className="home" href="/">Home</a><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>
      </header>
    </div>
  </div>
)
export default Header