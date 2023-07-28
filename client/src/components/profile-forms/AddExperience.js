import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import PropTypes from 'prop-types';


const AddExperience = ({ addExperience }) => {

   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: ''
   });


   const { company, title, location, from, to, current, description } = formData;

   const inputHandler = event => {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value
      });
   };

   const formSubmitHandler = event => {
      event.preventDefault();
      addExperience(formData).then(() => navigate('/dashboard'));
   };
 
   return (
      <section className='container'>
         <h1 className="large text-primary">
            Add An Experience
         </h1>
         <p className="lead">
            <i className="fas fa-code-branch" /> 
            Add any developer/programming positions that you have had in the past
         </p>
         <small>* = required field</small>

         <form className="form" onSubmit={formSubmitHandler}>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="* Job Title" 
                  name="title" 
                  value={title}
                  onChange={inputHandler}
                  required 
               />
            </div>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="* Company" 
                  name="company"
                  value={company} 
                  onChange={inputHandler}
                  required 
               />
            </div>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="Location" 
                  name="location"
                  value={location} 
                  onChange={inputHandler}
               />
            </div>
            <div className="form-group">
               <h4>From Date</h4>
               <input 
                  type="date" 
                  name="from" 
                  value={from}
                  onChange={inputHandler}
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
                     }}
                  /> {' '}Current Job
               </p>
            </div>
               <div className="form-group">
                  <h4>To Date</h4>
                  <input 
                     type="date" 
                     name="to"
                     value={to} 
                     onChange={inputHandler}
                     disabled={current}
                  />
               </div>
            <div className="form-group">
               <textarea
                  name="description"
                  cols="30"
                  rows="5"
                  placeholder="Job Description"
                  value={description}
                  onChange={inputHandler}
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

AddExperience.propTypes = {
   addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(AddExperience);