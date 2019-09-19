import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserSignUp from './components/UserSignUp';
import UpdateCourse from './components/UpdateCourse';
import CourseDetails from './components/CourseDetails';
import Header from './components/Header';
import Courses from './components/Courses';
// import UserSignOut from './components/UserSignOut';
import UserSignIn from './components/UserSignIn';
import CreateCourse from './components/CreateCourse';

import './styles/global.css';
// import logo from './logo.svg';
import './App.css';


export default class App extends Component {


  render() {
    return (

      <div className="container">
        <Header />

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/create" component={CreateCourse} />
            <Route path="/:id/update" component={UpdateCourse} />
            <Route path="/:id" component={CourseDetails} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />
            {/* <Route path="/signout" component={UserSignOut} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}