import React, { Component } from 'react';
import Form from "./Form";
import axios from 'axios';

export default class Courses extends Component {

  state = {
    courses: [],
    id: "",
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: ''
  };

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = (e) => {

    const { context } = this.props;
    const { id, title, description, estimatedTime, materialsNeeded, errors } = this.state;
    const courses = { id, title, description, estimatedTime, materialsNeeded, errors };
    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
     const userId = authUser.id;
    const credentials = btoa(`${emailAddress}:` + password);
    context.data.createCourse(courses, credentials, authUser)

    if (courses.description === '' || courses.title === '') {
      this.setState({
        errors: 'Course and Description are required'
      })
    } else {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/api/courses/',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Basic ${credentials}`
        },

        auth:
        {
          emailAddress: emailAddress,
          password
        },
        // 'Basic' + btoa(this.props.context.authenticatedUser.emailAddress),

        data: {
          title: courses.title,
          description: courses.description,
          estimatedTime: courses.estimatedTime,
          materialsNeeded: courses.materialsNeeded
        }
      }).then(() => {
        alert("Course updated successfully");
        this.props.history.push("/");
      }).catch(err => {
        if (err.response.status === 400) {
          this.setState({
            errors: err.response.data.message
          })
        } else if (err.response.status === 500) {
          alert("Course and Description must be updated ")
          this.props.history.push("/error");
        }
      })
    }
  }

  componentDidMount() {

    axios.post('http://localhost:5000/api/courses/')
      .then(response => {
        this.setState({
          courses: response.data,
        })
      })
      .catch(error => {
        if (error.status === 404) {
          console.log('ohh nooo')
        }
      })
  }


  render() {
    const { errors, title, description, estimatedTime, materialsNeeded, } = this.state;
    const courses = this.state.courses;
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { authenticatedUser } = this.props.context;

    return (

      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
            {errors.length > 0
              ? <h2 className="validation--errors--label">Validation Errors</h2> : ''}
            <p>
              {errors.length > 0
                ? errors.map(error => <ul key={error}>error</ul>) : ''}
            </p>
          </div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <div>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <React.Fragment>
                      <input id="title"
                        name="title"
                        type="text"
                        className="input-title course--title--input"
                        placeholder="Course title..."
                        value={title}
                        onChange={this.change} />
                    </React.Fragment>
                    <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                    <div className="course--description">
                      <React.Fragment>
                        <textarea id="description"
                          name="description"
                          type="text"
                          placeholder="Course description..."
                          value={description}
                          onChange={this.change} />
                      </React.Fragment>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li key="Estimated Time">
                          <h4>Estimated Time</h4>
                          <div>
                            <React.Fragment>
                              <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                className="course--time--input"
                                placeholder="Hours"
                                value={estimatedTime}
                                onChange={this.change} />
                            </React.Fragment>
                          </div>
                        </li>
                        <li key="Materials">
                          <h4>Materials Needed</h4>
                          <div>
                            <textarea
                              id="materialsNeeded"
                              name="materialsNeeded"
                              placeholder="List materials..."
                              value={materialsNeeded}
                              onChange={this.change}
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )} />

        </div>
      </div>
    );
  }




  cancel = () => {
    this.props.history.push('/');
  };

};