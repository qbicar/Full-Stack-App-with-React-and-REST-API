import React, { Component } from 'react';
import axios from 'axios';



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
      .then(() => console.log('yup'))
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
    return (
    
    
    <div className="grid-33" >
      <a className="course--module course--link"
        href={`/api/courses/id/courseDetail`}>
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{courses.title}</h3>
      </a>
      <a className="course--module course--add--module"
        href="create-course.html"><h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          viewBox="0 0 13 13" className="add">
          <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
        </svg>New Course</h3></a>
    </div> 
    )
  }
}


export default Courses