import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './styles/global.css';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Courses from './components/Courses';


export default class App extends Component {


render(){
return (

  <div className="container"> 
  <Header/>
  <Courses getCourses={this.getCourses}/>

  <BrowserRouter>
      <Switch>
      <Route exact path="/" />
      <Route path="/:id" Component={Courses} />
      <Route path="/:name" />
      <Route path="/:name" />
      <Route path="/:name" />
      </Switch>
  </BrowserRouter> 
  </div>
)
}
}