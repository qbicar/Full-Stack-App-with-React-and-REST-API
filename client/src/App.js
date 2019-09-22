import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserSignUp from './components/UserSignUp';
import UpdateCourse from './components/UpdateCourse';
import CourseDetails from './components/CourseDetails';
import Header from './components/Header';
import Courses from './components/Courses';
import UserSignOut from './components/UserSignOut';
import UserSignIn from './components/UserSignIn';
import CreateCourse from './components/CreateCourse';
import './styles/global.css';
import './App.css';
import withContext from './styles/Context';
const UserSignInWithContext = withContext(UserSignIn);
export default class App extends Component {


  render() {
    return (

      <div className="container">
        <Header />

        <BrowserRouter>
          <Switch>
            <Route key={0} exact path="/" component={Courses} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path={`/courses/:id/update`} component={UpdateCourse} />
            <Route path="/courses/:id" component={CourseDetails} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUp} />
            <Route path="/signout" component={UserSignOut} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

//TODO: signin and signup to work
//TODO: header to change on signin
//TODO: components to actually do something
//TODO: authorization
//TODO: context
//TODO: 