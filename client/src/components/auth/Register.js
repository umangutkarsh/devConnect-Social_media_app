import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
// import axios from 'axios';


const Register = ({ setAlert, register, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const inputHandler = event => 
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const formSubmitHandler = async event => {
    event.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    }

    else {
      // register({ name, email, password });
      console.log('success');

      // const newUser = {
      //   name, 
      //   email, 
      //   password
      // }

      // try {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   }

      //   const body = JSON.stringify(newUser);

      //   const res = await axios.post('/api/users', body, config);
      //   console.log(res.data);
      // } catch (err) {
      //   console.error(err.response.data);
      // }
    }
  }; 

  if (isAuthenticated) {
    return (
      <Navigate to="/dashboard" />
    );
  }


  return (
    <section className='container'>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={event => formSubmitHandler(event)}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Name" 
            name="name" 
            value={name} 
            onChange={event => inputHandler(event)}
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email"
            value={email}
            onChange={event => inputHandler(event)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={event => inputHandler(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={event => inputHandler(event)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login"><u>Sign In</u></Link>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);