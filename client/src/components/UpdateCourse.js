import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class UpdateCourse extends Component {
  constructor() {
    super();
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
  componentDidMount() {

    axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
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
    const courses = this.state.courses;
    return (
      <div>
        {courses.map(course =>
          <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
              <form>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                      defaultValue={course.title} /></div>
                    <p>{course.firstName} {course.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." defaultValue={course.description}>
                    </textarea></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li key="0" className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={course.estimatedTime} /></div>
                      </li>
                      <li key="1" className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." defaultValue={course.materialsNeeded}>
                        </textarea></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick = {this.submit}>Update Course</button>
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