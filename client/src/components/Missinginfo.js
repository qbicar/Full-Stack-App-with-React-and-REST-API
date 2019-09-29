import React from 'react';
import { Link } from 'react-router-dom';
//<===== stateless component to display an missing information message when Update is missing a description or title
const Missinginfo = () => {
  return (
    <div className="bounds">
      <h1>Missing Information</h1>
      <p>(Title & Description Required, Go back & Try Again)</p>
      <Link className="button button-secondary" to="/">Return to Course List</Link>
    </div>
  );
}

export default Missinginfo;