import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      id: "",
      title: "",
      description: "",
      materialsNeeded: "",
      estimatedTime: "",
      firstName: "",
      lastName: ""
    }
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


  submit = e => {
    e.preventDefault();
    const { context } = this.props;
    const { id, title, description, estimatedTime, materialsNeeded } = this.state;
    const courses = { id, title, description, estimatedTime, materialsNeeded };
    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
    const credentials = btoa(`${emailAddress}:` + password);
    context.data.updateCourse(courses, credentials, authUser)


    if (courses.description === '' || courses.title === '') {
      this.setState({
        errors: 'Course and Description are required'
      })
    } else {
      axios({
        method: 'PUT',
        url: 'http://localhost:5000/api/courses/' + this.props.match.params.id,
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

    axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          courses: response.data,
          id: this.props.match.params.id
        })
      })
      .catch(error => {
        if (error.status === 404) {
          console.log('ohh nooo')
        }
      })
  }



  render() {
    const courses = this.state.courses;
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (

      <div>
        {courses.map(course =>
          <div key={course.id} className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
              <form onSubmit={this.submit}>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                      defaultValue={course.title} onChange={this.change} /></div>
                    <p>{course.user.firstName} {course.user.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." defaultValue={course.description} onChange={this.change} />
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li key="0" className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={course.estimatedTime} onChange={this.change} /></div>
                      </li>
                      <li key="1" className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." defaultValue={course.materialsNeeded} onChange={this.change} />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom">
                  {(authUser && authUser.id === course.user.id) &&
                    <button className="button" type="submit" onClick={this.submit}>Update Course</button>}
                  <Link className="button button-secondary" to={'/courses/' + this.props.match.params.id}>Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default UpdateCourse