import React, { Component } from 'react';
import { } from "react-router-dom";
import Form from "./Form";

export default class Courses extends Component {

  state = {
    errors: [],
    courseTitle: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: ''
  };

  render() {
    const {
      errors,
      courseTitle,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

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
                      <input id="courseTitle"
                        name="courseTitle"
                        type="text"
                        className="input-title course--title--input"
                        placeholder="Course title..."
                        value={courseTitle}
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

    const {
      authenticatedUser,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    const course = {
      authenticatedUser,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    };

    if (errors.length > 0) {
      context.data.createCourse(course, authenticatedUser)
        .then(errors => {
          if (errors.length) {
            e.preventDefault();
            this.setState({ errors })
          } else {
            context.actions.createCourse(course, authenticatedUser)
              .then(this.props.history.push('/courses'));
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        });
    } else {
      console.log("nope")
      // e.preventDefault();
    }
  };

  cancel = () => {
    this.props.history.push('/');
  };

};






// import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
// import axios from 'axios'

// class CreateCourse extends Component {
//   state = {
//     errors:[],
//     courses:[],
//     title: "",
//     description: "",
//     estimatedTime: "",
//     materialsNeeded: ""
//   };

//   submit = e => {
//     e.preventDefault();
//     const { context } = this.props;
//     const courses = this.state;
//     const authUser = context.authenticatedUser;
//     const emailAddress = authUser.emailAddress;
//     const password = authUser.password;
//     const credentials = btoa(`${authUser.emailAddress}:` + password);

//     // making sure title and description fields are not empty before updating the course
//     if (this.state.courses.description === '' || this.state.courses.title === '') {
//       this.setState({
//         errors: 'Course and Description are required'
//       })
//     } else {
//       axios({
//         method: 'put',
//         url: `http://localhost:5000/api/courses/${this.props.match.params.id}`,
//         headers: {
//           'Content-Type': 'application/json; charset=utf-8',
//           'Authorization': `Basic ${credentials}`
//         },
//         auth: {
//           username: emailAddress,
//           password
//         },
//         data: {
//           title: courses.title,
//           description: courses.description,
//           estimatedTime: courses.estimatedTime,
//           materialsNeeded: courses.materialsNeeded
//         }
//       }).then(() => {
//         alert("Course updated successfully");
//         this.props.history.push("/");
//       }).catch(err => {
//         if (err.response.status === 400) {
//           this.setState({
//             errors: err.response.data.message
//           })
//         } else if (err.response.status === 500) {
//           this.props.history.push("/error");
//         }
//       })
//     }
//   }

//   change = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     this.setState(() => {
//       return {
//         [name]: value
//       };
//     });
//   }


//   render() {
//     const { errors,
//       courseTitle,
//       description,
//       estimatedTime,
//       materialsNeeded} = this.state;
//     const { context } = this.props;
//     const authUser = context.authenticatedUser;
//     return (
//       <div className="bounds course--detail">
//         <h1>Create Course</h1>
//         <div>
//           <div>
//             {errors.length > 0
//               ?
//         <h2 className="validation--errors--label">Validation errors</h2> : ''}
//             {errors.length > 0
//               ? errors.map(error => <ul key={error}>error</ul>) : ''}
//             {/* <div className="validation-errors"> */}
//               {/* <ul>
//                 <li>Please provide a value for "Title"</li>
//                 <li>Please provide a value for "Description"</li>
//               </ul> */}
//             {/* </div> */}
//           </div>
//           <form>
//             <div className="grid-66">
//               <div className="course--header">
//                 <h4 className="course--label">Course</h4>
//                 <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
//                   defaultValue="" /></div>
//                 <p></p>
//               </div>
//               <div className="course--description">
//                 <div><textarea id="description" name="description" className="" placeholder="Course description..."> </textarea></div>
//               </div>
//             </div>
//             <div className="grid-25 grid-right">
//               <div className="course--stats">
//                 <ul className="course--stats--list">
//                   <li className="course--stats--list--item">
//                     <h4>Estimated Time</h4>
//                     <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
//                       placeholder="Hours" value="" /></div>
//                   </li>
//                   <li className="course--stats--list--item">
//                     <h4>Materials Needed</h4>
//                     <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."></textarea></div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="grid-100 pad-bottom">
//               <button className="button" type="submit">Create Course</button>
//               <Link className="button button-secondary" to='/'>Cancel</Link></div>
//           </form>
//         </div>
//       </div>

//     )
//   }
// }

// export default CreateCourse