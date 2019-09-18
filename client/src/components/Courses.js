import React, { Component } from 'react';
import axios from 'axios';
import NotFound from './NotFound';



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
 
    if(courses.length > 0){
      const results =  courses.map(course => 
        <div className="grid-33" >
          <a className="course--module course--link"
            href={`/${course.id}`}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
          </a>
      </div>)
        return results
    }else{
       return (
      <NotFound />
    )
    }
  }
}



export default Courses