import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import PropTypes from 'prop-types';


const AddEducation = ({ addEducation, navigate }) => {

   const [formData, setFormData] = useState({
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: ''
   });

   const [toDateDisabled, toggleDisabled] = useState(false);

   const { school, degree, fieldofstudy, from, to, current, description } = formData;

   const inputHandler = event =>
      setFormData({
         ...formData,
         [event.target.name]: event.target.value
      });

   

   return (
      <section className='container'>
         <h1 className="large text-primary">Add Your Experience</h1>
         <p className="lead">
            <i className="fas fa-code-branch" /> 
            Add any school / bootcamp that you have attended
         </p>
         <small>* = required field</small>

         <form className="form" onSubmit={event => {
            event.preventDefault();
            addEducation(formData, navigate);
         }}>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="* School or Bootcamp" 
                  name="school" 
                  value={school}
                  onChange={event => inputHandler(event)}
                  required 
               />
            </div>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="* Degree or Certificate" 
                  name="degree"
                  value={degree} 
                  onChange={event => inputHandler(event)}
                  required 
               />
            </div>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="Field of Study" 
                  name="fieldofstudy"
                  value={fieldofstudy} 
                  onChange={event => inputHandler(event)}
               />
            </div>
            <div className="form-group">
               <h4>From Date</h4>
               <input 
                  type="date" 
                  name="from" 
                  value={from}
                  onChange={event => inputHandler(event)}
               />
            </div>
            <div className="form-group">
               <p>
                  <input 
                     type="checkbox" 
                     name="current" 
                     checked={current}
                     value={current}
                     onChange={() => {
                        setFormData({ ...formData, current: !current });
                        toggleDisabled(!toDateDisabled);
                     }}
                  /> {' '}Current School or Bootcamp
               </p>
            </div>
               <div className="form-group">
                  <h4>To Date</h4>
                  <input 
                     type="date" 
                     name="to"
                     value={to} 
                     onChange={event => inputHandler(event)}
                     disabled={toDateDisabled ? 'diabled' : ''}
                  />
               </div>
            <div className="form-group">
               <textarea
                  name="description"
                  cols="30"
                  rows="5"
                  placeholder="Program Description"
                  value={description}
                  onChange={event => inputHandler(event)}
               />
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">
               Go Back
            </Link>
         </form>
      </section>
   );
};

AddEducation.propTypes = {
   addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(AddEducation);