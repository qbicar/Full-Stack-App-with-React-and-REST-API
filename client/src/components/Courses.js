import React, { Component } from 'react';
import axios from 'axios';
import NotFound from './NotFound';
import { Link } from 'react-router-dom';


class Courses extends Component {

  state = { courses: [] }
  getCourses = () => {
    axios.get(`http://localhost:5000/api/courses`)
      .then(response => {
        const courses = response.data
        return courses
      })
      .then(courses => this.setState({
        courses: courses,
        logo: false
      }))
      .catch(error => {
        console.log("Error", error)
        this.setState({
          logo: false
        })
      })
  }

  componentDidMount() {
    this.getCourses()
  }


  render() {
    const { courses } = this.state;

    if (courses.length > 0) {
      return (
        <div>
          {courses.map(course =>
            <div className="grid-33" >
              <Link className="course--module course--link"
                to={`/courses/${course.id}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
              </Link>
            </div>)}
          <div className="grid-33">
            <Link className="course--module course--add--module" to="/courses/create">
              <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
            </Link></div>
        </div>
      )
    } else {
      return (
        <NotFound />
      )
    }

  }
}

export default Courses